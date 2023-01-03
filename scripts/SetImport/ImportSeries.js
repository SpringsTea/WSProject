const ConvertCards = require('./ConvertCards.js')
const Scrape = require('./ImageScrape/ScrapeV2.js');
//const JPCardPatch = require('./JPCardPatch.js')

let IMPORT_SERIES =  process.env.SERIES || null;

const releases = ConvertCards(IMPORT_SERIES)
releases.map((release) => Scrape(release))
//const patch = JPCardPatch(releases)


