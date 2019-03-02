const mongoose = require('mongoose')

const cardSchema = mongoose.Schema({
	sid: String,
	name: String,
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
	attributes: [String],
	ability: [String],
	trigger: {
		type: [String],
		default: []
	}
}, {collection: 'card'});
module.exports = mongoose.model('Card', cardSchema);