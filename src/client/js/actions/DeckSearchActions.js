import { dispatch } from '../dispatcher';
import { DeckSearchActions as AT } from '../constants/Actions';

export const receiveDecks = (data) => dispatch({ type: AT.DECKS_RECEIVE, data });