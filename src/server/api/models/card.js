const mongoose = require('mongoose')

const locale = {
	'name': String,
	'attributes': [String],
	'ability': [String]
};

const cardSchema = mongoose.Schema({
	sid: String,
	set: String,
	side: String,
	release: String,
	lang: String,
	cardtype: String,
	colour: String,
	level: Number,
	cost: Number,
	power: Number,
	soul: Number,
	rarity: String,
	trigger: {
		type: [String],
		default: []
	},
	locale: {
		'EN' : locale,
		'NP' : locale
	}
}, {collection: 'card'});
module.exports = mongoose.model('Card', cardSchema);