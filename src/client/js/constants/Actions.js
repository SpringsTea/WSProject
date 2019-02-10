export const BuilderActions = [
  'SERIESES_RECEIVE',
  'SERIES_RECEIVE',
  'SELECT_CARD',
  'ADD_DECK_CARD',
  'REMOVE_DECK_CARD',
  'FILTER_BUILDER',
].reduce((p, v) => (p[v] = Symbol(v), p), {});

export const DeckViewActions = [
	'DECK_RECEIVE',
	'SELECT_CARD',
].reduce((p, v) => (p[v] = Symbol(v), p), {});
