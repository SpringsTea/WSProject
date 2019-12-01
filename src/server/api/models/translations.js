const mongoose = require('mongoose')
var ObjectId = mongoose.Schema.Types.ObjectId;
var Mixed = mongoose.Schema.Types.Mixed;

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
	attributes: { type: Mixed, default: {} },
	approvedate: { type: Date, default: null },
	moddate: { type: Date, default: Date.now },
	moduser: { type: ObjectId },
}, { collection: 'translations', minimize: false })

module.exports = mongoose.model('Translations', translationsSchema);