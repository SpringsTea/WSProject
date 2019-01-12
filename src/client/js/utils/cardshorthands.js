export let calculateShortHand = (card) => {

	switch(card.type){
		case 'Climax':
			return 'Cx'
		break;
		case 'Charicter':
			return `${card.level}/${card.cost} C`
		break;
		case 'Event':
			return `${card.level}/${card.cost} E`
		break;
		default:
			return '?'
	}
}