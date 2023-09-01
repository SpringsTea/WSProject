const { readdirSync, readFileSync, writeFileSync, statSync } = require('fs')
const { join, extname } = require('path')
var LOCALE = process.env.LOCALE || 'NP';
var WSS_PATH = process.env.WSS_PATH || __dirname + `/../Cards/wsoffdata/`;
var SETDATA_PATH = __dirname + `/../SetData/${LOCALE}/`;
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
	"N",
	"NR",
];
if(process.env.RARITY_EXCEPT){
	ALLOWED_RARITY.push(process.env.RARITY_EXCEPT);
}

function cleanText(text){
	let cleantext = text;
	cleantext = cleantext.replace(/[\u201C\u201D]/g, '\"');
	cleantext = cleantext.replace(/[\u2019]/g, "\'")

	return cleantext;
}


const convert = (SERIES) => {
	var WSS_SERIES = readdirSync(WSS_PATH).filter(f => statSync(join(WSS_PATH, f)).isDirectory())
	
	if( SERIES ){
		WSS_SERIES = WSS_SERIES.filter( ( set ) => set === SERIES )
	}
	else{
		console.log('SERIES not provided')
		return [];
	}

	let releases = [];

	WSS_SERIES.forEach( (wss_series) => {

		//Array of side/releases eg. ['S51']
		var WSS_RELEASES = readdirSync(WSS_PATH+wss_series).filter(f => statSync(join(WSS_PATH+wss_series, f)).isDirectory());
		releases = releases.concat(WSS_RELEASES)

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
					ability: [],
					imageURL: wss_card.imageURL
				}

				wss_card.ability && wss_card.ability.forEach( (text, i) => { 
					card.ability.push(cleanText(text));
				})

				set.push(card);
			})
			console.log('file written', SETDATA_PATH + wss_release + '.json')
			writeFileSync(SETDATA_PATH + wss_release+'.json', JSON.stringify(set), { encoding: 'utf8'} );

		})
	})
	return releases
}

module.exports = convert;