module.exports = {
	calcuateTriggers: (deck) => {
		let uniquecxs = [];
		let decktriggers = [];

		deck.cards.map((card) => {

			const cardlocale = card?.lang === 'EN' ? card?.locale?.EN : card?.locale?.NP

			if(!cardlocale?.name){
				return false;
			}

			if(!card?.trigger || card?.trigger.length === 0){
				return false;
			}

			if( uniquecxs.includes(cardlocale.name) ){
				return false;
			}
			else{
				uniquecxs.push(cardlocale.name)
			}

			//Special case for identifying double soul trigger
			if( card?.trigger.length === 2 && card?.trigger?.[0] === 'SOUL' && card?.trigger?.[1] === 'SOUL'  ){
				decktriggers.push('SOUL')
				return true;
			}

			card?.trigger.map((trig) => {
				if(trig !== 'SOUL'){
					decktriggers.push(trig)
				}			
			})
		})

		return decktriggers.sort();
	}
}
