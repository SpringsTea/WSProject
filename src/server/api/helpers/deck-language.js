'use strict';
//Check what language a deck is
//Decks are JP unless they have only english cards

module.exports = (carddata) => {	
	let lang = 'EN';
	for (let card of carddata) {
		if( card.lang === 'JP' ){
			return 'JP'
		}
	}

	return lang;
}