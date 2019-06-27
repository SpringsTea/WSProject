const config = require('../src/server/config/mongo.js')
const mongoose = require('mongoose')
const { readdirSync, readFileSync, statSync } = require('fs')
const { join } = require('path')

const MODEL_PATH = '../src/server/api/models';
const LOCALE = process.env.LOCALE || 'JP';
const SET_PATH = `./SetData/${LOCALE}`;
const SET_FILE = process.env.FILE || null;

const CardModel = require(`${MODEL_PATH}/card`)
const SeriesModel = require(`${MODEL_PATH}/series`)

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

var WSS_SERIES = readdirSync(SET_PATH).filter(f => statSync(join(SET_PATH, f)).isFile())

//SET_FILE specified a single file to run through the patch
if( SET_FILE ){
  WSS_SERIES = WSS_SERIES.filter( (f) => f == SET_FILE )
}

WSS_SERIES.forEach( (FILE) => {

  let setContent = JSON.parse(readFileSync(`${SET_PATH}/${FILE}`, { encoding: 'utf8'}));
  //Holds the series cards belong to so we dont have to fetch the series each time
  let series = null;

  setContent.forEach( async (sourcecard) => {

    //If series hasnt been fetched yet, or the card does not match the series of the previous cards
    if( series == null || series.side != sourcecard.side || series.release != sourcecard.release ){
      series = await SeriesModel.findOne({lang: 'JP', side: sourcecard.side, release: sourcecard.release});
    } 

    let remotecard = await CardModel.findOne({side:sourcecard.side, release: sourcecard.release, sid: sourcecard.sid, lang: 'JP'});

    if( remotecard ){
      //Update existing card
      remotecard.locale[LOCALE == 'JP' ? 'EN' : LOCALE] = {
        name: sourcecard.name,
        ability: sourcecard.ability,
        attributes: sourcecard.attributes
      }

      //Only update series if there is none set
      //Never override existing series because sometime is has to be manually set because fuck bushi
      if( remotecard.series == null ){
        remotecard.series = series ? series._id : null;
      }      

      remotecard.save();
      console.log('Card Saved', remotecard._id);
    }
    else{
      CardModel.create({...sourcecard, 
        locale: {
          [LOCALE == 'JP' ? 'EN' : LOCALE]: { name:sourcecard.name, ability:sourcecard.ability, attributes: sourcecard.attributes }
        }, 
        series: series._id,
        lang:'JP'
      }, function(err, data){
        if(err){
          console.log('Something went wrong', err);
        }
        else{
          console.log('Card added:', sourcecard.sid);
        }
      })
    }  
    
  })

})

