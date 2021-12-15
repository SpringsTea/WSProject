//Convert individual card json files provided by WSOnline into on file for import
/*example:
 SERIES=AOT LOCALE=NP node ConvertWSSCards.js

LOCALE = NP for raw untranslated data, which is inserted into the NP locale
LOCALE = JP for translated JP cards, which is instered into the EN locale
*/


const { readdirSync, readFileSync, writeFile, statSync } = require('fs')
const { join, extname } = require('path')
var LOCALE = process.env.LOCALE || 'EN';
var WSS_PATH = process.env.WSS_PATH || `./Cards/${LOCALE}/`;
var SETDATA_PATH = `./SetData/${LOCALE == 'EN' ? 'JP' : LOCALE}/`;
var ALLOWED_RARITY = [
	"C",
	"CC",
	"CR",
	"FR",
	"MR",
	"PR",
	"PS",
	"R",
	"RE",
	"RR",
	"RR+",
	"TD",
	"U",
	"AR",
	"BDR",
	"N"
];
if(process.env.RARITY_EXCEPT){
	ALLOWED_RARITY.push(process.env.RARITY_EXCEPT);
}

var WSS_SERIES = readdirSync(WSS_PATH).filter(f => statSync(join(WSS_PATH, f)).isDirectory())

//add series as env var to only convert that set
//SERIES=AOT node ConverWSSCards.js
if( process.env.SERIES ){
	WSS_SERIES = WSS_SERIES.filter( ( set ) => set === process.env.SERIES )
}
else{
	process.exit()
}

//SERIES IE. AOT LLS etc
WSS_SERIES.forEach( (wss_series) => {

	var WSS_RELEASES = readdirSync(WSS_PATH+wss_series).filter(f => statSync(join(WSS_PATH+wss_series, f)).isDirectory());

	WSS_RELEASES.forEach( ( wss_release ) =>{
		var wss_files = readdirSync(`${WSS_PATH}${wss_series}/${wss_release}`);

		let set = [];//Put all converted cards into this new set
		wss_files.filter(( file ) => extname(file) === '.json').forEach( (wss_file) => {

			let wss_content = readFileSync(`${WSS_PATH}${wss_series}/${wss_release}/${wss_file}`, { encoding: 'utf8'});
			let wss_card = JSON.parse(wss_content);

			let wss_cardname = LOCALE === 'EN' ? wss_card.name : wss_card.jpName;

			if(!ALLOWED_RARITY.includes(wss_card.rarity.toUpperCase())){
				console.log(`Card Skipped (${wss_card.side}${wss_card.release}/${wss_card.id})`)
				return false;//Do not import card
			}

			let card = {
				sid: wss_card.id,
				name: cleanText(wss_cardname),
				set: wss_card.set,
				side: wss_card.side,
				release: wss_card.release,
				lang: 'JP',
				cardtype: wss_card.cardType,
				colour: wss_card.colour,
				level: parseInt(wss_card.level),
				cost: parseInt(wss_card.cost),
				power: parseInt(wss_card.power),
				soul: parseInt(wss_card.soul),
				rarity: wss_card.rarity,
				attributes: wss_card.specialAttrib || [],
				trigger: wss_card.trigger || [],
				ability: []
			}

			wss_card.ability && wss_card.ability.forEach( (text, i) => { 
				card.ability.push(cleanText(text));
			})

			set.push(card);
		})

		writeFile(SETDATA_PATH + wss_release+'.json', JSON.stringify(set), 'utf8', (res) => console.log(res) );
	})

})

function cleanText(text){
	let cleantext = text;
	cleantext = cleantext.replace(/[\u201C\u201D]/g, '\"');
	cleantext = cleantext.replace(/[\u2019]/g, "\'")

	return cleantext;
}