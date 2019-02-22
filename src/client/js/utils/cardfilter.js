// filters out duplicate cards and adds a quantity prop to each card
export const filterCardQuantity = (cards) =>{
  return cards.reduce( (a, b) => {
	    const i = a.findIndex( (x) => x._id === b._id);
	    return i === -1 ? a.push({...b, quantity: 1}) : a[i].quantity++, a;
  }, []);
};
