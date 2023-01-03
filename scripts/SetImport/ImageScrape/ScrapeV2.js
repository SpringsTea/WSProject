const { readFileSync, createWriteStream, existsSync, mkdirSync, unlink } = require('fs')
var axios = require('axios');
var sharp = require('sharp');

var SET_DATA_PATH = '../SetData/NP'
var IMAGE_DESTINATION = '../../public/images/JP'

var EXTENSION = process.env.IMAGE_EXTENSION || 'png';
var APPEND_TRIAL = false;//set to false for old sets that dont need -td appended

var download = (url, filename) => {

  return new Promise(resolve => {
    axios({method: "get", url, responseType: 'stream'})
    .then((res) => {
      res.data.pipe(createWriteStream(filename)).on('close', resolve);
    })
  }) 

  // request.head(uri, function(err, res, body){
  //   console.log('content-type:', res.headers['content-type']);
  //   console.log('content-length:', res.headers['content-length']);

  //   request(uri).pipe(createWriteStream(filename)).on('close', callback);
  // });
};

const Scrape = async(SET_FILE) => {

  console.log('Scraping images...', SET_FILE)

  let set = JSON.parse(readFileSync(`${SET_DATA_PATH}/${SET_FILE}.json`, { encoding: 'utf8'}));

  for (const card of set) {
    var trial =  APPEND_TRIAL && card.sid.indexOf('T') !== -1;

    var cardset = `${card.set.toLowerCase()}_${card.side.toLowerCase()}${card.release.toLowerCase()}`
    var cardname = `${cardset}_${card.sid.toLowerCase()}.${EXTENSION}`

    var remotepath = `https://ws-tcg.com/wordpress/wp-content/images/cardlist/${card.set.toLowerCase().charAt(0)}/${card.set.toLowerCase()}_${card.side.toLowerCase()}${card.release.toLowerCase()}/${cardname}`;
    console.log(remotepath)

    !existsSync(`${IMAGE_DESTINATION}/${card.side}${card.release}`) && mkdirSync(`${IMAGE_DESTINATION}/${card.side}${card.release}`);

     await download(remotepath, `${IMAGE_DESTINATION}/${card.side}${card.release}/${card.sid}.${EXTENSION}`)
     .then(() => {
        if(EXTENSION != 'gif'){
          sharp(`${IMAGE_DESTINATION}/${card.side}${card.release}/${card.sid}.${EXTENSION}`)
          .rotate()
          .toFile(`${IMAGE_DESTINATION}/${card.side}${card.release}/${card.sid}.gif`, (err, info) => {
            console.log('Converted to gif')
            unlink(`${IMAGE_DESTINATION}/${card.side}${card.release}/${card.sid}.${EXTENSION}`, (err) => err ? console.log(err) : console.log('Done'))
          })
        }    
     })
  }
}

module.exports = Scrape;