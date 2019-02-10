import { dispatch } from '../dispatcher';
import { DeckViewActions as AT } from '../constants/Actions';

export const receiveDeck = (data) => dispatch({ type: AT.DECK_RECEIVE, data });