export let calculateShortHand = (card) => {

	switch(card.cardtype){
		case 'CX':
			return 'Cx'
		break;
		case 'CH':
			return `${card.level}/${card.cost} C`
		break;
		case 'EV':
			return `${card.level}/${card.cost} E`
		break;
		default:
			return '?'
	}
}

export let generateCardImageLink = (card) => {
	return card ? `/images/${card.imagepath}` : '';
}

export let generateCardCode = (card) => {
	return card ? `${card.cardcode}` : '';
}