const config = require('../../src/server/config/mongo.js')
const logger = require('../../src/server/logger.js')
const mongoose = require('mongoose')
var ObjectId = mongoose.Types.ObjectId;

const { readdirSync, readFileSync, statSync } = require('fs')
const { join } = require('path')

const MODEL_PATH = __dirname +'/../../src/server/api/models';
const LOCALE = process.env.LOCALE || 'NP';

const CardModel = require(`${MODEL_PATH}/card`)
const SeriesModel = require(`${MODEL_PATH}/series`)

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

const patch = async(Cards, { game = 'WS' }) => {

  console.log(`${Cards.length} files being patched...`)

  let series = null;

  for (let CardContent of Cards) {

    let armylimit = 4;

    //Check if this cards series has been loaded yet
    if( !series || (series.set !== CardContent.set && series.side !== CardContent.side && series.release !== CardContent.release) ){
      series = await SeriesModel.findOne({lang: 'JP', game, side: CardContent.side, release: CardContent.release});

      if(!series){
        createseries = new SeriesModel({
          _id: new ObjectId(),
          enabled: false,
          game,
          set: CardContent.set,
          side: CardContent.side,
          release: CardContent.release,
          name: `${CardContent.set}-${CardContent.side}${CardContent.release}`,
          lang: 'JP',
          hash: new ObjectId()
        })
        await createseries.save()
        series = createseries;
        logger( `Series created: ${JSON.stringify(createseries)}` )
      }
      else{
        series.hash = new ObjectId(); //Generate new hash each time cards in a series have been updated
        series.save();
      }

    }

    //Check if card breaks the rule of 4 cards per deck AKA army cards
    if(CardContent.ability.length > 0){
      CardContent.ability.map((abilitytext) => {
        if(abilitytext.includes('このカードと同じカード名のカードは、デッキに')){//JP text that represents 'you can run up to X copies of this card in your deck'
          //remove all non digits from ability text 
          //The idea being that any number present in this ability text is the number defining how many copies of a card can be run
          const armytext = (abilitytext).replace( /\D/g,'').trim();
          if(armytext){
            armylimit = parseInt(armytext)
          }
          else{
            armylimit = -1;//unlimited
          }
          console.log(`Army detected ${armylimit}`, `${CardContent.set}-${CardContent.side}${CardContent.release}/${CardContent.id}`)
        }
      })
    }

    //Check if this card exists in the db already
    let remotecard = await CardModel.findOne({cardcode: CardContent.cardcode, lang: 'JP'});

    //Update existing card
    if( remotecard ){
      remotecard.locale[LOCALE] = {
        name: CardContent.name || CardContent.jpName,
        ability: CardContent.ability || [],
        attributes: CardContent.specialAttrib || [],
      }

      remotecard.level = CardContent.level
      remotecard.colour = CardContent.colour
      remotecard.cardtype = CardContent.cardType 
      remotecard.imagepath = `JP/${CardContent.set}/${CardContent.side}${CardContent.release}/${CardContent.id}.png`
      remotecard.armycount = armylimit;

      //Only update series if there is none set
      //Never override existing series because sometime is has to be manually set because fuck bushi
      if( remotecard.series == null ){
        remotecard.series = series ? series._id : null;
      }   

      await remotecard.save();
      console.log('Card Saved', CardContent.cardcode, remotecard._id);
    }
    else{
      await CardModel.create({...CardContent, 
        locale: {
          [LOCALE]: { name:CardContent.name || CardContent.jpName, ability:CardContent.ability || [], attributes: CardContent.attributes || [] }
        }, 
        series: series._id,
        sid: CardContent.id,
        lang:'JP',
        trigger: CardContent.trigger || [],
        cardtype: CardContent.cardType,
        cardcode: CardContent.cardcode || `${CardContent.set}/${CardContent.side}${CardContent.release}-${CardContent.id}`,
        imagepath: `JP/${CardContent.set}/${CardContent.side}${CardContent.release}/${CardContent.id}.png`,
        game,
        armycount: armylimit
      }, function(err, data){
        if(err){
          console.log('Something went wrong', err);
        }
        else{
          console.log('Card added:', CardContent.id);
        }
      })
    } 
  }
  console.log('Patch Complete')
  return true;
}

module.exports = patch;