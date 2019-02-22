import mongoose from 'mongoose';

const seriesSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  set: String,
  release: String,
  name: String,
}, {collection: 'series'});

module.exports = mongoose.model('Series', seriesSchema);
