import mongoose from 'mongoose'

const cardSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: String
})

module.exports = mongoose.model('Card', cardSchema);