const config = require('../src/server/config/mongo.js')
const mongoose = require('mongoose')

const { readdirSync, readFileSync, statSync } = require('fs')
const { join } = require('path')

const SET_PATH = './SetData/EN';
const MODEL_PATH = '../src/server/api/models/card';

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
    let remotecard = await CardModel.findOne({side:sourcecard.side, release: sourcecard.release, 'sid': sourcecard.sid, 'lang': 'EN'});

    if( remotecard ){
     //Update existing card
      remotecard.locale['EN'] = {
        name: sourcecard.name,
        ability: sourcecard.ability,
        attributes: sourcecard.attributes
      }

      remotecard.save();
      console.log('Card Saved', remotecard._id);
    }
    else{

      let newcard = sourcecard;

      newcard.lang = 'EN';
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

      CardModel.create(newcard, function(err, data){
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
