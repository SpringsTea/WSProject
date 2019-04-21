const config = require('../src/server/config/mongo.js')
const mongoose = require('mongoose')
const { readdirSync, readFileSync } = require('fs')

//RELEASE=63 LOCALE=NP SIDE=W node JPCardPatch

const MODEL_PATH = '../src/server/api/models/card';
const SIDE = process.env.SIDE || 'S';
const RELEASE = process.env.RELEASE || '35';
const LOCALE = process.env.LOCALE || 'JP';
const SET_PATH = `./SetData/${LOCALE}`;
const sid = null;

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

let setContent = JSON.parse(readFileSync(`${SET_PATH}/${SIDE}${RELEASE}.json`, { encoding: 'utf8'}));

//filter by sid if specified
let cardsToUpdate = setContent.filter( (cards) => { 
  if(sid){
    return cards.sid === sid;
  }
  else{
    return true;
  }
});

cardsToUpdate.forEach( async (sourcecard) => {
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


