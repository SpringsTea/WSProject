'use strict';
//Given an array of card documents and the users config settings, locales are removed to meet locale requirments

module.exports = (cards, { preferredlocale = 'EN', unofficialen = true }) => {	
	return cards.map((c) => {
		let locale = {};

		if(!!c.locale[preferredlocale].name){//if the prefered locale exists
			locale =  {[preferredlocale] : c.locale[preferredlocale]};
			if(unofficialen === false && c.locale[preferredlocale].source === "community"){
				locale = c.locale['NP'].name ? 
				{'NP' : c.locale['NP']}
				: {'EN' : c.locale['EN']}
			}
		}
		else{
			locale = c.locale
		}

		return {
			...c.toObject(),
			locale: locale
		}
	});
}