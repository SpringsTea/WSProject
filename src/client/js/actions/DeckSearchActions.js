import { dispatch } from '../dispatcher';
import { DeckSearchActions as AT } from '../constants/Actions';

export const receiveDecks = (data) => dispatch({ type: AT.DECKS_RECEIVE, data });
export const receiveSerieses = (data) => dispatch({ type: AT.SERIESES_RECEIVE, data });