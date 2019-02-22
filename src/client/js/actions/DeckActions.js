import {dispatch} from '../dispatcher';
import {DeckViewActions as AT} from '../constants/Actions';
import {throttle} from 'throttle-debounce';

export const receiveDeck = (data) => dispatch({type: AT.DECK_RECEIVE, data});
export const selectCard = throttle( 500, (data) => dispatch({type: AT.SELECT_CARD, data}) );
