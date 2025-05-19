const { readFileSync, createWriteStream, existsSync, mkdirSync, unlink } = require('fs')
var axios = require('axios');

var SET_DATA_PATH = __dirname +'/../../SetData/NP'
var IMAGE_DESTINATION = __dirname +'/../../../public/images/JP'

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

const Scrape = (cards = []) => {
  console.log(`Scraping ${cards.length} images...`)

  return new Promise(async(resolve, reject) => {
    for (const card of cards) {
      const remotepath = card.remoteimage;
      const carddestination = `${IMAGE_DESTINATION}/${card.set}/${card.side}${card.release}`

      !existsSync(carddestination) && mkdirSync(carddestination, { recursive: true });

      //If the .gif image already exists, skip downloading
      if( !existsSync(`${carddestination}/${card.id}.png`) ){
        console.log(`Downloading: ${carddestination}/${card.id}.png`)
        await download(remotepath, `${carddestination}/${card.id}.png`)
      }
      else{
        console.log('Skipping download: ' + `${IMAGE_DESTINATION}/${card.side}${card.release}/${card.id}.png`)
      }

    }
    resolve()
  })
}

module.exports = Scrape;
