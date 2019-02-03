import mongoose from 'mongoose'

var ObjectId = mongoose.Schema.Types.ObjectId;

const deckSchema = mongoose.Schema({
	name: String,
	userid: ObjectId,
	description: { type: String, default: '' }, 
	datecreated: { type: Date, default: Date.now },
	datemodified: { type: Date, default: Date.now },
	complete: { type: Boolean, default: false },
	cards: [{ type: String, ref: 'Card' }]
}, { collection: 'deck' });



module.exports = mongoose.model('Deck', deckSchema);