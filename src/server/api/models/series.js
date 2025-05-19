const mongoose = require('mongoose')
var ObjectId = mongoose.Schema.Types.ObjectId;

const seriesSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	game: { type: String, default: 'WS' },
	set: String,
	side: String,
	release: String,
	name: String,
	lang: String,
	enabled: { type: Boolean, default: true },
	hash: { type: ObjectId }
}, { collection: 'series' })

module.exports = mongoose.model('Series', seriesSchema);