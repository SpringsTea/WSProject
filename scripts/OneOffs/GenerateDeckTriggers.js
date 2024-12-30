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
	//triggers: { $exists: false }
	let decks = DeckModel.find({ deleted: false, deckid:'4lDPaXFH_', valid: true }).batchSize(100).cursor();
	console.log('Decks retreaved');

	for await( const deck of decks ){

		await deck.populate({ path: 'cards', match: { cardtype: 'CX' }, select: 'trigger' }).execPopulate();

		let uniquecxs = [];
		let decktriggers = [];

		//deck.cards is only CX cards because of how the above populate works
		deck.cards.map((card) => {

			if(!card?.trigger || card?.trigger.length === 0){
				return false;
			}

			if( uniquecxs.includes(card._id) ){
				return false;
			}
			else{
				uniquecxs.push(card._id)
			}

			//Special case for identifying double soul trigger
			if( card?.trigger.length === 2 && card?.trigger?.[0] === 'SOUL' && card?.trigger?.[1] === 'SOUL'  ){
				decktriggers.push('SOUL')
				return true;
			}

			card?.trigger.map((trig) => {
				if(trig !== 'SOUL'){
					decktriggers.push(trig)
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
