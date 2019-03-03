import mongoose from 'mongoose'
import shortid from 'shortid';
import mongoosePaginate from 'mongoose-paginate-v2';

var ObjectId = mongoose.Schema.Types.ObjectId;

const deckSchema = mongoose.Schema({
	name: { type: String, maxlength: 100 },
	userid: ObjectId,
	deckid: { type: String, default: shortid.generate },
	description: { type: String, maxlength: 2000, default: '' }, 
	datecreated: { type: Date, default: Date.now },
	datemodified: { type: Date, default: Date.now },
	lang: { type: String, default: 'JP' },
	valid: { type: Boolean, default: false },
	cards: [{ type: String, ref: 'Card' }],
	sets: [{type: String, ref: 'Series'}],
	neo_sets: { type: Array, default: [] },
	neo_fail: { type: String, default: '' },
}, { collection: 'deck' });

deckSchema.index({ name: 'text', description: 'text' });
deckSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Deck', deckSchema);