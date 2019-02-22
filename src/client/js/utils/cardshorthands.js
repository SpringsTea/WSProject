export const calculateShortHand = (card) => {
  switch (card.cardtype) {
    case 'CX':
      return 'Cx';
      break;
    case 'CH':
      return `${card.level}/${card.cost} C`;
      break;
    case 'EV':
      return `${card.level}/${card.cost} E`;
      break;
    default:
      return '?';
  }
};

export const generateCardImageLink = (card) => {
  return `/images/${card.side}${card.release}/${card.sid}.gif`;
};
