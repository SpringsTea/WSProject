'use strict';

module.exports = (deck, carddata) => {
	let deckSets = new Set();
	
	for (let cardID of deck.cards) {
		//get card data from ID
        let card = carddata.find( c => c._id == cardID );

        if( card ){
        	// build card number (remove variant indicators)
        	deckSets.add( `${card.set}/${card.side}${card.release}` );
        }
       
	}

	return Array.from(deckSets);
}