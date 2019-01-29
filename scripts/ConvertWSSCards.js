const { readdirSync, readFileSync, writeFile, statSync } = require('fs')
const { join } = require('path')
var WSS_PATH = process.env.WSS_PATH || './';

var WSS_SETS = readdirSync(WSS_PATH).filter(f => statSync(join(WSS_PATH, f)).isDirectory())

WSS_SETS.forEach( (wss_set) => {

	var wss_files = readdirSync(wss_set);


	let set = [];//Put all converted cards into this new set
	wss_files.forEach( (wss_file) => {
		let wss_content = readFileSync(`${WSS_PATH}${wss_set}/${wss_file}`, { encoding: 'utf8'});
		let wss_card = JSON.parse(wss_content);

		let card = {
			sid: wss_card.id,
			name: wss_card.name,
			set: wss_card.set,
			side: wss_card.side,
			release: wss_card.release,
			cardtype: wss_card.cardType,
			colour: wss_card.colour,
			level: parseInt(wss_card.level),
			cost: parseInt(wss_card.cost),
			power: parseInt(wss_card.power),
			soul: parseInt(wss_card.soul),
			rarity: wss_card.rarity,
			attributes: wss_card.specialAttrib || [],
			ability: wss_card.ability || []
		}

		set.push(card);
	})

	writeFile(wss_set+'.json', JSON.stringify(set), 'utf8', (res) => console.log(res) );

})