require('dotenv').config()
const simpleGit = require('simple-git');

const ConvertCards = require('./ConvertCards.js')
const Scrape = require('./ImageScrape/ScrapeV2.js');
const JPCardPatch = require('./JPCardPatch.js')
const logger = require('../../src/server/logger.js')

let IMPORT_SERIES =  process.env.SERIES || null;
let SKIP_IMAGES = process.env.SKIP_IMAGES || false;
let SKIP_PATCH = process.env.SKIP_PATCH || false;

const git = simpleGit({
	baseDir: __dirname + '/../Cards/wsoffdata',
	binary: 'git',
	maxConcurrentProcesses: 6
})

console.log('Pulling git data...')
//For testing, you can rollback to an older commit via: git reset --hard f9209899e6c7e6248a7b7b113e8176a4973ed275
git.pull().then(async(PullSummary) =>{
	const updatedfiles = PullSummary.files;
	console.log('Git pull complete', updatedfiles)
	const sets = updatedfiles.reduce((setlist, filepath) => {
		if(filepath.includes('.json')){
			setlist.add( filepath.substring(0, filepath.indexOf("/")));
		}
		return setlist;
	}, new Set()) 

	const setstoprocess = IMPORT_SERIES ? [ IMPORT_SERIES ] : [...sets]	
	let logstring = `Begin import: ${new Date().toJSON()} \n`;
	logstring += `Importing: ${JSON.stringify(setstoprocess)} \n`;

	for (const setcode of setstoprocess) {
		console.log('Convert start:', setcode)
		const releases = ConvertCards(setcode)
		console.log('Convert end:', releases)

		if(!SKIP_IMAGES){
			for (const release of releases) {
				let scraper = await Scrape(release)
			}
		}

		if(!SKIP_PATCH){
			const patch = JPCardPatch(releases)
		}
	}

	logstring += `Import complete: ${new Date().toJSON()}`
	logger(logstring)
})





