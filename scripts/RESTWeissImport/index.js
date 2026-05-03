const { getExpansions } = require('./Expansions');
const { getCards } = require('./Cards');

let EXPANSION_ID =  process.env.EXPANSION_ID || null;

async function Go(){
	const ExpansionList = await getExpansions({ id: EXPANSION_ID }) //Keep in mind that TDs have their own seperate expansions
	console.log(`${ExpansionList.length} expansions found`)
	for (const expansion of ExpansionList) {
	  console.log(`fetching cards for expansion ${expansion.id} (${expansion.name})...`)
	  const Cards = await getCards({ expansion });
	  console.log(`${Cards.length} cards found`);
	  console.dir(Cards, { depth: null })
	}
}

Go()

