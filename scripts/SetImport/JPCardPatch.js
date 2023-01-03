const config = require('../../src/server/config/mongo.js')
const mongoose = require('mongoose')
var ObjectId = mongoose.Types.ObjectId;

const { readdirSync, readFileSync, statSync } = require('fs')
const { join } = require('path')

const MODEL_PATH = '../../src/server/api/models';
const LOCALE = process.env.LOCALE || 'NP';
const SET_PATH = `../SetData/${LOCALE}`;

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

const patch = (WSS_SERIES) => {

  console.log(`${WSS_SERIES.length} files being patched...`)

  WSS_SERIES.forEach( (FILE) => {

    let setContent = JSON.parse(readFileSync(`${SET_PATH}/${FILE}.json`, { encoding: 'utf8'}));
    //Holds the series cards belong to so we dont have to fetch the series each time
    let series = null;

    setContent.forEach( async (sourcecard) => {

      //If series hasnt been fetched yet, or the card does not match the series of the previous cards
      if( series == null || series.side != sourcecard.side || series.release != sourcecard.release ){
        series = await SeriesModel.findOne({lang: 'JP', set: sourcecard.set, side: sourcecard.side, release: sourcecard.release});
        series.hash = new ObjectId(); //Generate new hash each time cards in a series have been updated
        series.save();
      } 

      let remotecard = await CardModel.findOne({set: sourcecard.set, side:sourcecard.side, release: sourcecard.release, sid: sourcecard.sid, lang: 'JP'});

      if( remotecard ){
        //Update existing card
        remotecard.locale[LOCALE == 'JP' ? 'EN' : LOCALE] = {
          name: sourcecard.name,
          ability: sourcecard.ability,
          attributes: sourcecard.attributes,
          level: sourcecard.level,
          colour: sourcecard.colour,
        }

        //Only update series if there is none set
        //Never override existing series because sometime is has to be manually set because fuck bushi
        if( remotecard.series == null ){
          remotecard.series = series ? series._id : null;
        }

        remotecard.cardtype = sourcecard.cardtype;      

        remotecard.save();
        console.log('Card Saved', FILE, remotecard._id);
      }
      else{
        CardModel.create({...sourcecard, 
          locale: {
            [LOCALE == 'JP' ? 'EN' : LOCALE]: { name:sourcecard.name, ability:sourcecard.ability, attributes: sourcecard.attributes }
          }, 
          series: series._id,
          lang:'JP',
          cardcode: sourcecard.cardcode || `${sourcecard.set}/${sourcecard.side}${sourcecard.release}-${sourcecard.sid}`,
          imagepath: `${sourcecard.lang}/${sourcecard.side}${sourcecard.release}/${sourcecard.sid}.gif`
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
  return true;
}

module.exports = patch;