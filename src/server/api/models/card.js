import mongoose from 'mongoose'

const cardSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	sid: String,
	name: String,
	set: String,
	side: String,
	release: String,
	cardtype: String,
	colour: String,
	level: Number,
	cost: Number,
	power: Number,
	soul: Number,
	rarity: String,
	attributes: [String],
	ability: [String]
}, {collection: 'card'})

module.exports = mongoose.model('Card', cardSchema);