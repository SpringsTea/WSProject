const path = require('path');
const { readFileSync, createWriteStream, existsSync, mkdirSync, unlink } = require('fs')
var axios = require('axios');

const IMAGE_DOWNLOAD_RATELIMIT = 100;//Requesting to many images quickly will get us 403'd.

var download = (url, filename) => {

  return new Promise(resolve => {
    axios({
      method: "get", 
      url, 
      responseType: 'stream',
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)", // Pretend to be a browser
        "Accept": "image/avif,image/webp,image/apng,image/*,*/*;q=0.8"
      }
    })
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
      const imagedestination = card.imagedestination;
      const imageextension = path.extname(card.imagepath)

      !existsSync(imagedestination) && mkdirSync(imagedestination, { recursive: true });

      //If the .gif image already exists, skip downloading
      if( !existsSync(`${imagedestination}/${card.sid}${imageextension}`) ){
        console.log(`Downloading: ${imagedestination}/${card.sid}${imageextension}`)
        await download(remotepath, `${imagedestination}/${card.sid}${imageextension}`)
      }
      else{
        console.log('Skipping download: ' + `${imagedestination}/${card.sid}${imageextension}`)
      }

    }
    console.log('Images Complete')
    resolve()
  })
}

module.exports = Scrape;
