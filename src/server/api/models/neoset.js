const mongoose = require('mongoose')
var ObjectId = mongoose.Schema.Types.ObjectId;

const neosetSchema = new mongoose.Schema({
	name: { type: String },
	game: { type: String, default: 'WS' },
	setcodes: [{ type: String }],
	enabled: { type: Boolean, default: true },
	hash: { type: ObjectId }
}, { collection: 'neosets' })

module.exports = mongoose.model('neoSet', neosetSchema);