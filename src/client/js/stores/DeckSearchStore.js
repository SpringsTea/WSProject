import Store from './Store';
import { DeckSearchActions as AT } from '../constants/Actions';
import { register } from '../dispatcher';

let decks = [];

const DeckSearchStore = {
  ...Store,
  getDecks: () => decks,
  reducer: register(async ({ type, ...props }) => {
    switch(type) {
      case AT.DECKS_RECEIVE:
        decks = props.data;
        break;
      default: return;
    }
    DeckSearchStore.emitChange(type);
  }),
};

export default DeckSearchStore;