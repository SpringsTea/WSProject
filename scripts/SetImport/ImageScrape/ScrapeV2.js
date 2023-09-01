const { readFileSync, createWriteStream, existsSync, mkdirSync, unlink } = require('fs')
var axios = require('axios');
var sharp = require('sharp');

var SET_DATA_PATH = __dirname +'/../../SetData/NP'
var IMAGE_DESTINATION = __dirname +'/../../../public/images/JP'

var EXTENSION = process.env.IMAGE_EXTENSION || 'png';
var APPEND_TRIAL = false;//set to false for old sets that dont need -td appended
const IMAGE_DOWNLOAD_RATELIMIT = 200;//Requesting to many images quickly will get us 403'd.

var download = (url, filename) => {

  return new Promise(resolve => {
    axios({method: "get", url, responseType: 'stream'})
    .then((res) => {
      setTimeout(() => {
        res.data.pipe(createWriteStream(filename)).on('close', resolve);
      }, IMAGE_DOWNLOAD_RATELIMIT)      
    })
    .catch((err) => {
      console.log('Request error', url, err.response)
        resolve()      
    })
  }) 
};

const Scrape = (SET_FILE) => {

  console.log('Scraping images...', SET_FILE)

  let set = JSON.parse(readFileSync(`${SET_DATA_PATH}/${SET_FILE}.json`, { encoding: 'utf8'}));

  return new Promise(async(resolve, reject) => {
    for (const card of set) {
      var trial =  APPEND_TRIAL && card.sid.indexOf('T') !== -1;

      var cardset = `${card.set.toLowerCase()}_${card.side.toLowerCase()}${card.release.toLowerCase()}`
      var cardname = `${cardset}_${card.sid.toLowerCase()}.${EXTENSION}`
      var remotepath = `https://ws-tcg.com${card.imageURL}`;
      console.log(remotepath)

      !existsSync(`${IMAGE_DESTINATION}/${card.side}${card.release}`) && mkdirSync(`${IMAGE_DESTINATION}/${card.side}${card.release}`);

      //If the .gif image already exists, skip downloading
      if( !existsSync(`${IMAGE_DESTINATION}/${card.side}${card.release}/${card.sid}.gif`) ){
        await download(remotepath, `${IMAGE_DESTINATION}/${card.side}${card.release}/${card.sid}.${EXTENSION}`)
        .then(async() => {
          if(EXTENSION != 'gif'){
            await sharp(`${IMAGE_DESTINATION}/${card.side}${card.release}/${card.sid}.${EXTENSION}`)
            .rotate()
            .toFile(`${IMAGE_DESTINATION}/${card.side}${card.release}/${card.sid}.gif`, (err, info) => {
              console.log('Converted to gif')
              unlink(`${IMAGE_DESTINATION}/${card.side}${card.release}/${card.sid}.${EXTENSION}`, (err) => err ? console.log(err) : console.log('Done'))
            })
          }    
        })
      }
      else{
        console.log('Skipping download: ' + `${IMAGE_DESTINATION}/${card.side}${card.release}/${card.sid}.${EXTENSION}`)
      }

    }
    resolve()
  })
}

module.exports = Scrape;
