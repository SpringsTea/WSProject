const config = require('../src/server/config/mongo.js')
const mongoose = require('mongoose')
var ObjectId = mongoose.Types.ObjectId;

const { readdirSync, readFileSync, statSync } = require('fs')
const { join } = require('path')

const SET_PATH = './Cards/WeissSchwarz-ENG-DB/DB';
const MODEL_PATH = '../src/server/api/models';
const SET_FILE = process.env.FILE || null;

const CardModel = require(`${MODEL_PATH}/card`)
const SeriesModel = require(`${MODEL_PATH}/series`)
const LangPatch = require('./ENtoJPLanguage');

var mongooseOptions = {
  useNewUrlParser: true
}

if( config.AUTH === true ){
  mongooseOptions.user = config.APP_USERNAME;
  mongooseOptions.pass = config.APP_PASSWORD;
}

console.log('connecting to mongoose...')
mongoose.connect(`mongodb://127.0.0.1:27017/wsdata?authSource=admin`, mongooseOptions);
console.log('connected');

let WSS_SERIES = readdirSync(SET_PATH).filter(f => statSync(join(SET_PATH, f)).isFile())

//SET_FILE specified a single file to run through the patch
if( SET_FILE ){
  WSS_SERIES = WSS_SERIES.filter( (f) => f == SET_FILE )
}

WSS_SERIES.forEach( async(FILE) => {
  let setContent = JSON.parse(readFileSync(`${SET_PATH}/${FILE}`, { encoding: 'utf8'}));

  let promises = setContent.map( async (sourcecard) => {
    let series = await SeriesModel.findOne({lang: 'EN', side: sourcecard.side, release: sourcecard.release}); 
    let remotecard = await CardModel.findOne({cardcode: sourcecard.code, 'lang': 'EN'});

    if( remotecard ){
     //Update existing card
      remotecard.power = isNaN(sourcecard.power) ? '0' : sourcecard.power;
      remotecard.level = isNaN(sourcecard.level) ? '0' : sourcecard.level;
      remotecard.cost = isNaN(sourcecard.cost) ? '0' : sourcecard.cost;
      remotecard.locale['EN'] = {
        name: sourcecard.name,
        ability: sourcecard.ability,
        attributes: sourcecard.attributes
      }
      
      //Only update series if there is none set
      //Never override existing series because sometime is has to be manually set because fuck bushi
      if( remotecard.series == null ){
        remotecard.series = series ? series._id : null;
      }  

      await remotecard.save();
      console.log('Card Saved', remotecard._id);
      return remotecard;
    }
    else{
      let newcard = Object.assign({},sourcecard);

      newcard.lang = 'EN';
      newcard.cardcode = sourcecard.code || `${sourcecard.set}/${sourcecard.side}${sourcecard.release}-${sourcecard.sid}`;
      newcard.imagepath = `EN/${sourcecard.side}${sourcecard.release}/${sourcecard.sid}.gif`
      newcard.cardtype = ((type) => {
        switch(type){
          case 'Character':
            return 'CH';
          case 'Event':
            return 'EV';
          case 'Climax':
            return 'CX';
          default:
            return 'ERR';
        }
      })(sourcecard.type)
      newcard.colour = sourcecard.color;
      newcard.power = isNaN(sourcecard.power) ? '0' : sourcecard.power;
      newcard.cost = isNaN(sourcecard.cost) ? '0' : sourcecard.cost;
      newcard.level = isNaN(sourcecard.level) ? '0' : sourcecard.level;
      newcard.locale = {
        ['EN']: { name:newcard.name, ability:newcard.ability, attributes: newcard.attributes }
      }
      newcard.series = series ? series._id : null;

      await CardModel.create(newcard, function(err, data){
        if(err){
          console.log('Something went wrong', err);
        }
        else{
          console.log('Card added:', sourcecard.sid);
        }
      })
      return newcard;
    }  
  })

  const savedcards = await Promise.all(promises)
  let seriescard = savedcards[0];
  let series = await SeriesModel.findOne({lang: 'EN', side: seriescard.side, release: seriescard.release});
  
  series.hash = new ObjectId();//Generate new hash each time cards in a series have been updated
  series.save();
  LangPatch(series._id)
})
