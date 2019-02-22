import mongoose from 'mongoose';
import shortid from 'shortid';

const ObjectId = mongoose.Schema.Types.ObjectId;

const deckSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 100,
  },
  userid: ObjectId,
  deckid: {type: String, default: shortid.generate},
  description: {type: String, maxlength: 2000, default: ''},
  datecreated: {type: Date, default: Date.now},
  datemodified: {type: Date, default: Date.now},
  valid: {type: Boolean, default: false},
  cards: [{type: String, ref: 'Card'}],
  neo_sets: {type: Array, default: []},
  neo_fail: {type: String, default: ''},
}, {collection: 'deck'});


module.exports = mongoose.model('Deck', deckSchema);
