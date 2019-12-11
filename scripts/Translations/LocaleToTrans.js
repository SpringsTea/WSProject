//Transfers english local of a given set to the translation system
//Used for traslations that were entered before the translation systems

const config = require('../../src/server/config/mongo.js')
const mongoose = require('mongoose')
var ObjectId = mongoose.Types.ObjectId;

const MODEL_PATH = '../../src/server/api/models';
const LOCALE = process.env.LOCALE || 'JP';
const SIDE = process.env.SIDE;
const RELEASE = process.env.RELEASE;

const CardModel = require(`${MODEL_PATH}/card`)
const SeriesModel = require(`${MODEL_PATH}/series`)
const TranslationModel = require(`${MODEL_PATH}/translations`)

var mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

if( config.AUTH === true ){
  mongooseOptions.user = config.APP_USERNAME;
  mongooseOptions.pass = config.APP_PASSWORD;
}

console.log('connecting to mongoose...')
mongoose.connect(`mongodb://127.0.0.1:27017/wsdata?authSource=admin`, mongooseOptions);
console.log('connected');

async function Go(){

  const series = await SeriesModel.findOne({lang: LOCALE, side: SIDE, release: RELEASE})
  .then( (series) => {
    console.log(`${series.name}(${series.side}${series.release})`)
    return series;
  })
  .catch( (err) => {
    console.log('Series block fail');
    console.log(err);
    process.exit()
  })

  let translation = await TranslationModel.findOne({seriesid: series._id})
  //A translation for this set dosnt currently exists
  if( translation === null ){
    translation = new TranslationModel({
      seriesid: series._id
    })
  }

  //Dont accedentilly blow away real translation data, or double up on data
  if( translation.translations.length > 0 || Object.keys(translation.attributes).length > 0 ){
    console.log('Translation data already exists');
    return false
  }

  const cards = await CardModel.find({series: series._id})
  let attributes = {};
  
  cards.map( (card) => {
    //populate attributes
    card.locale.NP.attributes.map((attr) => {
      if( !attributes[attr] ){
        attributes[attr] = attr;
      }            
    })
    translation.translations.push({
      cardid: card._id,
      name: card.locale.EN.name,
      ability: card.locale.EN.ability
    })

  })

  translation.attributes = attributes;
  translation.save();
}
Go()




