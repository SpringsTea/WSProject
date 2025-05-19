require('dotenv').config()

const { readdirSync, readFileSync, statSync } = require('fs')
const { join, extname } = require('path')
const simpleGit = require('simple-git');

const Scrape = require('./ImageScrape/ScrapeV3.js');
const logger = require('../../src/server/logger.js');
const CardPatch = require('./NewJPCardPatch.js');

let SitePath = 'https://ws-rose.com';
let CardsPath = __dirname + '/../Cards/wsrosedata';
let ExcludedRarities = ['SR'];
let IMPORT_SERIES =  process.env.SERIES || null; //OS02
let IMPORT_SET = process.env.SET || null; //R02
let SKIP_IMAGES = process.env.SKIP_IMAGES || false;
let SKIP_PATCH = process.env.SKIP_PATCH || false;

const git = simpleGit({
	baseDir: CardsPath,
	binary: 'git',
	maxConcurrentProcesses: 6
})

//Returns an array of json file paths for the requested cards
function getCards(){
	return new Promise(async (resolve, reject) => {
		let Cards = [];

		if( !!IMPORT_SERIES ){
			if( !!IMPORT_SET ){
				Cards = readdirSync(`${CardsPath}/${IMPORT_SERIES}/${IMPORT_SET}`)
					.map((file) => join(`${CardsPath}/${IMPORT_SERIES}/${IMPORT_SET}` ,file))
			}
			//If only the series has been specified, we get all of the directories inside that series
			else{
				const SetDirectories = readdirSync(`${CardsPath}/${IMPORT_SERIES}`).filter(f => statSync(join(`${CardsPath}/${IMPORT_SERIES}`, f)).isDirectory())

				SetDirectories.forEach((dir) => {
					let CardsToPush = readdirSync(`${CardsPath}/${IMPORT_SERIES}/${dir}`)
						.map((file) => join(`${CardsPath}/${IMPORT_SERIES}/${dir}` ,file))
					Cards = [...Cards, ...CardsToPush];
				})
			}

		}
		//If series has not been specified, we are importing everything from the next git pull
		else{
			console.log('Pulling git data...')
			//For testing, you can rollback to an older commit via: git reset --hard f9209899e6c7e6248a7b7b113e8176a4973ed275
			Cards = await git.pull().then(async(PullSummary) =>{
				const updatedfiles = PullSummary.files
					.map((file) => join(`${CardsPath}/` ,file))
				return updatedfiles;
			})
		}

		Cards = Cards.filter(( file ) => extname(file) === '.json')
		resolve(Cards)
	})
}

getCards().then(async(Cards) => {

	let CardData = []

	for (let FILE of Cards) {
    	let CardContent = JSON.parse(readFileSync(FILE, { encoding: 'utf8'}));
    	CardData.push(CardContent)
    }

    CardData = CardData.filter((Card) => {
    	return !ExcludedRarities.includes(Card.rarity)
    })

	if(!SKIP_IMAGES){
		let scraper = await Scrape(
			CardData.map((Card) => ({...Card, remoteimage: `${SitePath}${Card.imageURL}`}) )//We need to tell the scaper what site to download from
		)
	}

	if(!SKIP_PATCH){
		CardPatch(CardData, { game: "ROSE" })
	}
})





