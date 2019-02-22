export const calculateShortHand = (card) => {
  switch (card.cardtype) {
    case 'CX':
      return 'Cx';
    case 'CH':
      return `${card.level}/${card.cost} C`;
    case 'EV':
      return `${card.level}/${card.cost} E`;
    default:
      return '?';
  }
};

export const generateCardImageLink = (card) => {
  return `/images/${card.side}${card.release}/${card.sid}.gif`;
};
