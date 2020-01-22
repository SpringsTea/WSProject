const config = require('../src/server/config/mongo.js')
const mongoose = require('mongoose')
var ObjectId = mongoose.Types.ObjectId;

const MODEL_PATH = '../src/server/api/models';

const CardModel = require(`${MODEL_PATH}/card`)
const SeriesModel = require(`${MODEL_PATH}/series`)

var mongooseOptions = {
  useNewUrlParser: true
}

if( config.AUTH === true ){
  mongooseOptions.user = config.APP_USERNAME;
  mongooseOptions.pass = config.APP_PASSWORD;
}

//5e2885b6ec610a497b685105
//TODO add JP Equivilant to cards while your at it
const execute = async(seriesid = null, isscript = false) => {
	console.log('connecting to mongoose...')
	mongoose.connect(`mongodb://127.0.0.1:27017/wsdata?authSource=admin`, mongooseOptions);
	console.log('connected');

	let ENSearch = {
		lang: 'EN',
		enabled: true
	}

	//isscript is checked to avoid doing an update to every series unless it's during a script run
	if( seriesid || isscript == false ){
		ENSearch._id = seriesid
	}

	serieses = await SeriesModel.find(ENSearch);
	
	const actions = serieses.map( async( series ) => {
		let ENCards = await CardModel.find({ series: series._id})

		console.log(`Series found: ${series.name} (${ENCards.length} cards)`)

		let cardtranslations = ENCards.map( async(ENCard) => {
			const JPSid = ENCard.sid.replace('E', '');//Remove the E from the english card. We assume this will map to the japanese card
			return await CardModel.findOne({ side: ENCard.side, release: ENCard.release, sid: JPSid})
			.then( (JPCard) => {
				if( JPCard ){//A JP Equivilant was found
					if( !JPCard.locale.EN.name ){//It does not have english locale data already
						JPCard.locale.EN = ENCard.locale.EN;
						JPCard.equivilantcard = ENCard._id;
						return JPCard.save().then( (res) =>{
							console.log(`Card Saved: ${JPCard.side}${JPCard.release}-${JPCard.sid}`)
							return res
						})
					}
					else{
						console.log(`JP Card has data: ${JPCard.side}${JPCard.release}-${JPCard.sid}`)
						return JPCard
					}
				}
				else{//No card was found
					console.log(`Card could not be found: ${ENCard.side}${ENCard.release}-${ENCard.sid}`)
					return false;
				}
			})
		})
		return Promise.all(cardtranslations)
	})

	return Promise.all(actions)
}

if(!module.parent){
	const seriesid = process.env.SERIESID;
	execute(seriesid, true)
}

module.exports = execute