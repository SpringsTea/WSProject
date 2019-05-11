const mongoose = require('mongoose')

const seriesSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	set: String,
	side: String,
	release: String,
	name: String,
	lang: String
}, { collection: 'series' })

module.exports = mongoose.model('Series', seriesSchema);