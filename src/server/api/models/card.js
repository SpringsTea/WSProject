const mongoose = require('mongoose')

var ObjectId = mongoose.Schema.Types.ObjectId;

const locale = {
	'name': String,
	'attributes': [String],
	'ability': [String],
	'source': { type: String, defualt: 'bushi' }
};

const cardSchema = new mongoose.Schema({
	cardcode: String,
	sid: String,
	set: String,
	side: String,
	series: { type: ObjectId, ref: 'Series', default: null },
	release: String,
	lang: String,
	cardtype: String,
	colour: String,
	level: Number,
	cost: Number,
	power: Number,
	soul: Number,
	rarity: String,
	equivilantcard: { type: ObjectId, ref: 'Card', default: null },
	trigger: {
		type: [String],
		default: []
	},
	locale: {
		'EN' : locale,
		'NP' : locale
	},
	imagepath: String,
}, {collection: 'card'});
module.exports = mongoose.model('Card', cardSchema);