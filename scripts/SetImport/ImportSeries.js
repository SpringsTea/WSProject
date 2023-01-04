const ConvertCards = require('./ConvertCards.js')
const Scrape = require('./ImageScrape/ScrapeV2.js');
const JPCardPatch = require('./JPCardPatch.js')

let IMPORT_SERIES =  process.env.SERIES || null;
let SKIP_IMAGES = process.env.SKIP_IMAGES || false;
let SKIP_PATCH = process.env.SKIP_PATCH || false;

const releases = ConvertCards(IMPORT_SERIES)

if(!SKIP_IMAGES){
	releases.map((release) => Scrape(release))
}

if(!SKIP_PATCH){
	const patch = JPCardPatch(releases)
}