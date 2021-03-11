const config = require('../src/server/config/mongo.js')
const mongoose = require('mongoose')
var ObjectId = mongoose.Types.ObjectId;

const MODEL_PATH = '../src/server/api/models';

const Deck = require(`${MODEL_PATH}/deck`)
const NeoSets = require(`${MODEL_PATH}/neoset`)

var mongooseOptions = {
  useCreateIndex: true,
  useNewUrlParser: true
}

if( config.AUTH === true ){
  mongooseOptions.user = config.APP_USERNAME;
  mongooseOptions.pass = config.APP_PASSWORD;
}

console.log('connecting to mongoose...')
mongoose.connect(`mongodb://127.0.0.1:27017/wsdata?authSource=admin`, mongooseOptions);
console.log('connected');


Deck.find({}).then( (decks) => {
  decks.map( (deck) => {
    if( Array.isArray(deck.neo_sets) ){
      let tarr =
      deck.neo_sets.map( async(neoname, i) => {
        let neoset = await NeoSets.findOne({name: neoname});
        return neoset._id;
      })   

      Promise.all(tarr).then(res => {
        deck.neo_sets = res;
        deck.save();
      }) 
    }
  })
})