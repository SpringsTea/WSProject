'use strict';
import Series from '../models/series'

module.exports = async(deck, carddata) => {
	let deckSets = new Set();
	let setdata = new Set();
	
	for (let cardID of deck.cards) {
		//get card data from ID
        let card = carddata.find( c => c._id == cardID );

        if( card ){
        	let setparts = `${card.set}/${card.side}${card.release}/${card.lang}`
        	if( !setdata.has(setparts) ){
        		setdata.add(setparts)

        		let series = await Series.findOne({side: card.side, release: card.release, lang: card.lang}).exec();
        		deckSets.add(series._id);
        	}
        }
       
	}

	return Array.from(deckSets);
}