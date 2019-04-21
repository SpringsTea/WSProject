export const getLocale = (card) =>{

	if( !card ){
		return {};
	}

	if( card.locale.EN && card.locale.EN.name ){//Use EN if available
		return card.locale.EN;
	}
	
	if( card.locale.NP && card.locale.NP.name ){
		return card.locale.NP
	}

	return {
		name: 'Locale not found',
		attributes: [],
		ability: []
	};
}