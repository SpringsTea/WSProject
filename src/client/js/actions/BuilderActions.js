import { dispatch } from '../dispatcher';
import { BuilderActions as AT } from '../constants/Actions';
import { throttle } from 'throttle-debounce';

export const receiveSerieses = (data) => dispatch({ type: AT.SERIESES_RECEIVE, data });
export const receiveSeries = (data, remove) => dispatch({ type: AT.SERIES_RECEIVE, data, remove });
export const receiveDeck = (data) => dispatch({ type: AT.DECK_RECEIVE, data });
export const clearCards = (data) => dispatch({type: AT.CARDS_CLEAR, data});

export const selectCard = throttle( 500, (data, lock) => dispatch({ type: AT.SELECT_CARD, data, lock }) );
export const filterBuilder = throttle( 1000, (data) => dispatch({ type: AT.FILTER_BUILDER, data }) );

/*Deck actions*/
export const addDeckCard = (card) => dispatch({ type: AT.ADD_DECK_CARD, card });
export const removeDeckCard = (card) => dispatch({ type: AT.REMOVE_DECK_CARD, card });