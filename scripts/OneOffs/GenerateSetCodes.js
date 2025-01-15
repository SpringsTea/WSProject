/*
Generate setcodes for cards that only have side-release-sid data
*/

const config = require('../../src/server/config/mongo.js')
const mongoose = require('mongoose')
var ObjectId = mongoose.Types.ObjectId;

const MODEL_PATH = '../../src/server/api/models';

const CardModel = require(`${MODEL_PATH}/card`)
const SeriesModel = require(`${MODEL_PATH}/series`)

var mongooseOptions = {
  useNewUrlParser: true
}

if( config.AUTH === true ){
  mongooseOptions.user = config.APP_USERNAME;
  mongooseOptions.pass = config.APP_PASSWORD;
}

const execute = async(seriesid = null) => {
	console.log('connecting to mongoose...')
	mongoose.connect(`mongodb://127.0.0.1:27017/wsdata?authSource=admin`, mongooseOptions);
	console.log('connected');

	let SeriesSearch = {
		enabled: true
	}
	if( seriesid ){
		SeriesSearch._id = seriesid
	}

	serieses = await SeriesModel.find(SeriesSearch);
	console.log(`Patching ${serieses.length} serieses`)

	for(const series of serieses) {
		console.log(series.name);
		let cards = await CardModel.find({series: series._id});
		const updatecards = cards.map((card, i) => {
			card.cardcode = `${card.set}/${card.side}${card.release}-${card.sid}`;
			card.imagepath = `${card.lang}/${card.side}${card.release}/${card.sid}.gif`
			card.save();
		})
		console.log(`${cards.length} cards updated`)
		//TODO add card code and imagepath to the patch scripts
	}
}

if(!module.parent){
	const seriesid = process.env.SERIESID;
	execute(seriesid)
}

module.exports = execute