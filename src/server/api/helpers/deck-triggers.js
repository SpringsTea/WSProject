module.exports = {
	calcuateTriggers: (deck) => {
		let uniquecxs = [];
		let decktriggers = [];

		deck.cards.map((card) => {

			if(!card?.trigger || card?.trigger.length === 0){
				return false;
			}

			if( uniquecxs.includes(card._id) ){
				return false;
			}
			else{
				uniquecxs.push(card._id)
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
