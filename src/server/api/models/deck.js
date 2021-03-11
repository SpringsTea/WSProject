const mongoose = require('mongoose')
const shortid = require('shortid');
const mongoosePaginate = require('mongoose-paginate-v2');

var ObjectId = mongoose.Schema.Types.ObjectId;

const deckSchema = new mongoose.Schema({
	name: { type: String, maxlength: 100 },
	userid: { type: ObjectId, ref: 'User' },
	deckid: { type: String, default: shortid.generate },
	description: { type: String, maxlength: 2000, default: '' }, 
	datecreated: { type: Date, default: Date.now },
	datemodified: { type: Date, default: Date.now },
	lang: { type: String, default: 'JP' },
	valid: { type: Boolean, default: false },
	cards: [{ type: String, ref: 'Card' }],
	sets: [{type: String, ref: 'Series'}],
	neo_sets: [{type: ObjectId, ref: 'neoSet'}],
	neo_fail: { type: String, default: '' },
	deleted: { type: Boolean, default: false },
	views: { type: Number, default: 0 },
	attributes: { type: Array, default: [] },
	favoriteusers: [{ type: ObjectId, ref: 'User'}],
	favoritecount: { type: Number, default: 0 },
	myfavorite: {type: Boolean, default: false},//placeholder value to be assigned on search, should never be set
}, { collection: 'deck' });

deckSchema.index({ deckid: 1 });
deckSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Deck', deckSchema);