const config = require('../src/server/config/mongo.js')
const mongoose = require('mongoose')
const { readdirSync, readFileSync, statSync } = require('fs')
const { join } = require('path')

const MODEL_PATH = '../src/server/api/models/card';
const LOCALE = process.env.LOCALE || 'JP';
const SET_PATH = `./SetData/${LOCALE}`;

const CardModel = require(MODEL_PATH)

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

WSS_SERIES.forEach( (FILE) => {

  let setContent = JSON.parse(readFileSync(`${SET_PATH}/${FILE}`, { encoding: 'utf8'}));

  setContent.forEach( async (sourcecard) => {
    let remotecard = await CardModel.findOne({side:sourcecard.side, release: sourcecard.release, 'sid': sourcecard.sid, 'lang': 'JP'});

    if( remotecard ){
      //Update existing card
      remotecard.locale[LOCALE == 'JP' ? 'EN' : LOCALE] = {
        name: sourcecard.name,
        ability: sourcecard.ability,
        attributes: sourcecard.attributes
      }

      remotecard.save();
      console.log('Card Saved', remotecard.sid);
    }
    else{
      CardModel.create({...sourcecard, locale: {
        [LOCALE == 'JP' ? 'EN' : LOCALE]: { name:sourcecard.name, ability:sourcecard.ability, attributes: sourcecard.attributes }
      }, 
      lang:'JP'}, function(err, data){
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

