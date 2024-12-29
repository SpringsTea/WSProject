const config = require('../../src/server/config/mongo.js')
const mongoose = require('mongoose')
var ObjectId = mongoose.Types.ObjectId;

const MODEL_PATH = '../../src/server/api/models';

const DeckModel = require(`${MODEL_PATH}/deck`)
const CardModel = require(`${MODEL_PATH}/card`)

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
	let decks = DeckModel.find({ triggers: { $exists: false }, deleted: false, valid: true }).batchSize(100).cursor();

	for await( const deck of decks ){

		await deck.populate({ path: 'cards', match: { cardtype: 'CX' }, select: 'trigger' }).execPopulate();
		let decktriggers = new Set([]);

		deck.cards.map((card) => {
			if(!card?.trigger || card?.trigger.length === 0){
				return false;
			}

			//Special case for identifying double soul trigger
			if( card?.trigger.length === 2 && card?.trigger?.[0] === 'SOUL' && card?.trigger?.[1] === 'SOUL'  ){
				decktriggers.add('DSOUL')
				return true;
			}

			card?.trigger.map((trig) => {
				if(trig !== 'SOUL'){
					decktriggers.add(trig)
				}			
			})
		})

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
