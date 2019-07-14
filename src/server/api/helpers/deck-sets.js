'use strict';
import Series from '../models/series'

module.exports = async(deck, carddata) => {
	let deckSets = new Set();
	
	for (let cardID of deck.cards) {
		//get card data from ID
                let card = carddata.find( c => c._id == cardID );

                if( card ){
                	if( !deckSets.has(card.series) ){
                                deckSets.add(card.series);    		
                	}
                }
       
	}

	return Array.from(deckSets);
}