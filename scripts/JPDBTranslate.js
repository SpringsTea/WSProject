const config = require('../src/server/config/mongo.js')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

const { readdirSync, readFileSync, writeFile, statSync } = require('fs')
const { join, extname } = require('path')

const DB_PATH = process.env.DB_PATH || `./TranslationData/`;
var DB_DATA = readdirSync(DB_PATH);
const MODEL_PATH = '../src/server/api/models';
const LOCALE_OVERWRITE = !!process.env.LOCALE_OVERWRITE || false;//false prevents exsting EN locales from being modified

const CardModel = require(`${MODEL_PATH}/card`);
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

//Only proccess the given file
if( process.env.FILE ){
	DB_DATA = DB_DATA.filter( ( set ) => set === process.env.FILE )
}
else{
	if(!process.env.DOIT){//Only do one file at a time unless your really sure
		process.exit();
	}
}

DB_DATA.forEach( async(seriesfile) => {
	var SERIES_DATA = JSON.parse(readFileSync(DB_PATH+seriesfile, { encoding: 'utf8'}));
	let PROMISES = SERIES_DATA.map(async(data) => {
		let remotecard = await CardModel.findOne({cardcode: data.code, lang: 'JP'});
		if(!!remotecard){
			if( LOCALE_OVERWRITE === true || !remotecard.locale.EN.name ){
				remotecard.locale.EN = {
					...remotecard.locale.EN,
					name: data.name,
					ability: data.ability.map((a) => cleanText(a)),
					attributes: data.attributes,
					source: data.community === true ? 'community' : 'nova'
				}
				console.log(`${remotecard.cardcode}`)
				return remotecard.save();
			}
		}
		else{
			console.log(data.code, 'Card not found. Skipping')
			return Promise.resolve()
		}
	})

	await Promise.all(PROMISES)
	console.log(`${seriesfile} done`);
	
})

function cleanText(text){
	let cleantext = text;
	cleantext = cleantext.replace(/[\u201C\u201D]/g, '\"');
	cleantext = cleantext.replace(/[\u2019]/g, "\'")

	return cleantext;
}