const config = require('../../src/server/config/mongo.js')
const mongoose = require('mongoose')
var ObjectId = mongoose.Types.ObjectId;

const MODEL_PATH = '../../src/server/api/models';

const DeckModel = require(`${MODEL_PATH}/deck`)
const CardModel = require(`${MODEL_PATH}/card`)

const DeckTriggers = require('../../src/server/api/helpers/deck-triggers')

var mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

if( config.AUTH === true ){
  mongooseOptions.user = config.APP_USERNAME;
  mongooseOptions.pass = config.APP_PASSWORD;
}

(async function GenerateDeckTriggers() {

console.log('connecting to mongoose...')
await mongoose.connect(`mongodb://127.0.0.1:27017/wsdata?authSource=admin`, mongooseOptions);
console.log('connected');

try{
	//triggers: { $exists: false }
	let decks = DeckModel.find({ deleted: false, triggers: { $exists: false }, valid: true }).batchSize(100).cursor();
	console.log('Decks retrieved');

	for await( const deck of decks ){

		await deck.populate({ path: 'cards', match: { cardtype: 'CX' }, select: 'trigger' }).execPopulate();

		let decktriggers = DeckTriggers.calcuateTriggers(deck);

		deck.triggers = [...decktriggers];
		await deck.save();
		console.log(`${deck.deckid} saved`, decktriggers)
	}
} catch(err){
	console.error('Error:', err)
} finally{
	await mongoose.disconnect();
	console.log('Jobs Done')
}

})()
