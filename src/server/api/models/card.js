const mongoose = require('mongoose')

var ObjectId = mongoose.Schema.Types.ObjectId;

const locale = {
	'name': String,
	'attributes': [String],
	'ability': [String],
	flavor: {
		type: String,
		default: null
	},
	'source': { type: String, defualt: 'bushi' }
};

const cardSchema = new mongoose.Schema({
	id: {
		type: Number,
		default: null
	},
	cardcode: String,
	game: {
		type: String,
		default: 'WS'
	},
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
	locked: {type: Boolean, default: false},
	trigger: {
		type: [String],
		default: []
	},
	locale: {
		'EN' : locale,
		'NP' : locale
	},
	imagepath: String,
	armycount: {
		type: Number,
		default: 4
	},
	expansion: {
		type: Number,
		default: null
	}
}, {collection: 'card'});
module.exports = mongoose.model('Card', cardSchema);