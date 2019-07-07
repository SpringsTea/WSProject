const mongoose = require('mongoose')
var ObjectId = mongoose.Schema.Types.ObjectId;

const seriesSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	set: String,
	side: String,
	release: String,
	name: String,
	lang: String,
	enabled: { type: Boolean, default: true },
	hash: { type: ObjectId }
}, { collection: 'series' })

module.exports = mongoose.model('Series', seriesSchema);