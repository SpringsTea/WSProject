const mongoose = require('mongoose')
var ObjectId = mongoose.Schema.Types.ObjectId;

const translation = mongoose.Schema({
	cardid: { type: ObjectId },
	name: { type: String },
	ability: { type: Array, default: [] },
	moddate: { type: Date, default: Date.now },
	moduser: { type: ObjectId },
}, { _id: false })

const translationsSchema = mongoose.Schema({
	seriesid: { type: ObjectId },
	lang: { type: String, default: 'EN' },
	translations: [translation],
	attributes: [String],
	approvedate: { type: Date },
	moddate: { type: Date, default: Date.now },
	moduser: { type: ObjectId },
}, { collection: 'translations' })

module.exports = mongoose.model('Translations', translationsSchema);