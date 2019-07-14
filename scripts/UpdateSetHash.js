const config = require('../src/server/config/mongo.js')
const mongoose = require('mongoose')
var ObjectId = mongoose.Types.ObjectId;

const MODEL_PATH = '../src/server/api/models';

const SeriesModel = require(`${MODEL_PATH}/series`)
const SIDE = process.env.SIDE || null;
const RELEASE = process.env.RELEASE || null;

var mongooseOptions = {
  useNewUrlParser: true
}

if( config.AUTH === true ){
  mongooseOptions.user = config.APP_USERNAME;
  mongooseOptions.pass = config.APP_PASSWORD;
}

console.log('connecting to mongoose...')
mongoose.connect(`mongodb://127.0.0.1:27017/wsdata?authSource=admin`, mongooseOptions);
console.log('connected');

const filters = { }

if( SIDE ){ filters.side = SIDE }
if( RELEASE ){ filters.release = RELEASE }

let serieses = SeriesModel.find(filters).then( (res) => {
	res.forEach( (series) => {
		series.hash = new ObjectId()
		series.save();

		console.log(`${series.name} updated`)
	})
} )