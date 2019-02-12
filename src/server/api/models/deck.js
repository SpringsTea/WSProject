import mongoose from 'mongoose'
import shortid from 'shortid';

var ObjectId = mongoose.Schema.Types.ObjectId;

const deckSchema = mongoose.Schema({
	name: {
		type: String,
		maxlength: 100
	},
	userid: ObjectId,
	deckid: { type: String, default: shortid.generate },
	description: { type: String, maxlength: 2000, default: '' }, 
	datecreated: { type: Date, default: Date.now },
	datemodified: { type: Date, default: Date.now },
	valid: { type: Boolean, default: false },
	standard: { type: Boolean, default: true },
	cards: [{ type: String, ref: 'Card' }]
}, { collection: 'deck' });



module.exports = mongoose.model('Deck', deckSchema);