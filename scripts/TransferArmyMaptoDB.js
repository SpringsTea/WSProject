//Transfer over army data from the map file to the database
//This was only used to transition between using the flat file to storing the army requirments in the db

const armymap = require('../src/server/api/mappings/army-map')

const config = require('../src/server/config/mongo.js')
const mongoose = require('mongoose')
var ObjectId = mongoose.Types.ObjectId;

const MODEL_PATH = '../src/server/api/models';
const CardModel = require(`${MODEL_PATH}/card`)

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

Object.keys(armymap).forEach( async (cardcode) => {
	let remotecard = await CardModel.findOne({ cardcode: {"$regex": cardcode, $options: "i" }});
	if(remotecard){
		remotecard.armycount = armymap[cardcode]

		remotecard.save();
    console.log('Card Saved', remotecard._id);
	}
	else{
		console.log(`card not found: ${cardcode}`)
	}
})