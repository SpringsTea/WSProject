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

  let translation = await TranslationModel.findOne({seriesid: series._id, lang: 'EN'})
  //A translation for this set dosnt currently exists
  if( translation === null ){
    console.log('No translation data found')
    return false;
  }

  let response = translation.translations.map( (tran) => {

    return CardModel.findOne({ _id: tran.cardid })
    .then((card) => {

      if( card === null ){
        console.log(`No card found: ${card.sid}`)
        return false;
      }

      card.locale.EN.name = tran.name;
      card.locale.EN.ability = tran.ability;
      card.locale.EN.attributes = card.locale.NP.attributes.map( (a) => translation.attributes[a] )

      card.save();
      console.log(`card ${card.sid} saved`)
    })
    .catch( (err) => console(err) )

  })

  await Promise.all(response)
  translation.approvedate = Date.now()
  translation.save()
  console.log(`Approval Complete`)
}
Go()




