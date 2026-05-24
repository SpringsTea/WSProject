const path = require('path');

const { getExpansions } = require('./Expansions');
const { getCards } = require('./Cards');
const Scrape = require('./ImageScrape/ScrapeV3.js'); 
const { getSeries, createSeries } = require('./Mongo/Series');
const { getCard, createCard } = require('./Mongo/Card');

const mongoose = require('mongoose')
var ObjectId = mongoose.Types.ObjectId;

let EXPANSION_ID =  process.env.EXPANSION_ID || null;

const ImageUrl = 'https://ws-tcg.com/wordpress/wp-content/images/cardlist/';
const IMAGE_DESTINATION = path.resolve(
    __dirname,
    '../../public/images/JP'
)

const config = require('../../src/server/config/mongo.js')
var mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
if( config.AUTH === true ){
  mongooseOptions.user = config.APP_USERNAME;
  mongooseOptions.pass = config.APP_PASSWORD;
}

console.log('connecting to mongoose...')
mongoose.connect(`mongodb://127.0.0.1:27017/wsdata?authSource=admin`, mongooseOptions);
console.log('connected');

async function Go(){
	let CardImages = [];
	const ExpansionList = await getExpansions({ id: EXPANSION_ID }) //Keep in mind that TDs have their own seperate expansions
	console.log(`${ExpansionList.length} expansions found`)
	for (const expansion of ExpansionList) {
	  console.log(`fetching cards for expansion ${expansion.id} (${expansion.name})...`)
	  const Cards = await getCards({ expansion });
	  console.log(`${Cards.length} cards found`);
	  
	  let serieses = new Map;

	  for (let card of Cards) {
	  	let series = null;
	  	if( !serieses.get(`${card.side}-${card.release}`)){
	  		series = await getSeries({ side: card.side, release: card.release })

	  		//No series is found, lets create it
	  		if( !series ){
	  			series = await createSeries({
	  				set: card.set,
	  				side: card.side,
	  				release: card.release,
	  				lang: 'JP',
	  				hash: new ObjectId(),
	  				expansions: [ card.expansion ],
	  				update_date: expansion.update_date,
	  			})
	  		}

	  		serieses.set(`${series.side}-${series.release}`, series)
	  	}
	  	else{
	  		series = serieses.get(`${card.side}-${card.release}`)
	  	}

	  	//If series already exists but dosn't include this cards expansion
			if( !series.expansions.includes( card.expansion ) ){
				series.expansions = [...series.expansions, card.expansion]
				series.save();
			}

	  	CardImages.push({
	  		...card, 
	  		remoteimage: `${ImageUrl}${card.imagepath}`,
	  		imagedestination: `${IMAGE_DESTINATION}/${card.set}/${card.side}${card.release}`,
	  	})

	  	let remotecard = await getCard({ cardcode: card.cardcode })
	  	
	  	if( remotecard ){

	  		const imgext = path.extname(card.imagepath)

				remotecard.locale['JP'] = {
					name: card.name,
					ability: card.ability || [],
					attributes: card.attributes || [],
				}

				remotecard.level = card.level
				remotecard.colour = card.colour
				remotecard.cardtype = card.cardtype 
				remotecard.imagepath = `JP/${card.set}/${card.side}${card.release}/${card.sid}${imgext}`
				remotecard.armycount = card.armylimit;

				//Only update series if there is none set
				//Never override existing series because sometime is has to be manually set because fuck bushi
				if( remotecard.series == null ){
					remotecard.series = series ? series._id : null;
				}

				await remotecard.save();
				console.log('Card Saved', remotecard.cardcode, remotecard._id);
	  	}
	  	else{
				await createCard(card, series)
	  	}
	  }

	  let remoteseries = await getSeries({ expansion: expansion.id })
	  remoteseries.update_date = new Date()
	  remoteseries.save();

	  await Scrape(CardImages)
	}
	
}

Go()

