import Store from './Store';
import { DeckSearchActions as AT } from '../constants/Actions';
import { register } from '../dispatcher';

let decks = [];
let serieses = [];

const DeckSearchStore = {
  ...Store,
  getDecks: () => decks,
  getSerieses: () => serieses,
  reducer: register(async ({ type, ...props }) => {
    switch(type) {
      case AT.DECKS_RECEIVE:
        decks = props.data;
        break;
      case AT.SERIESES_RECEIVE:
        serieses = props.data;
        break;
      default: return;
    }
    DeckSearchStore.emitChange(type);
  }),
};

export default DeckSearchStore;