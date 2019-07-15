'use strict';
import Series from '../models/series'

module.exports = async(deck, carddata) => {
	let deckSets = new Set();
	let setStrings = new Set();
	
	for (let cardID of deck.cards) {
		//get card data from ID
        let card = carddata.find( c => c._id == cardID );

        if( card ){
        	if( !setStrings.has(card.series.toString()) ){
        		setStrings.add(card.series.toString());//You cant compare objects in sets, so I store and check the stringified objects aswell
                deckSets.add(card.series);    		
        	}
        }

	}

	console.log(deckSets);

	return Array.from(deckSets);
}