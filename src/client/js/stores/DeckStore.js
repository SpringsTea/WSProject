import Store from './Store';
import { DeckViewActions as AT } from '../constants/Actions';
import { register } from '../dispatcher';

let deck = [];

const DeckStore = {
  ...Store,
  getDeckData: () => deck,
  reducer: register(async ({ type, ...props }) => {
    switch(type) {
      case AT.DECK_RECEIVE:
        console.log(props)
        deck = props.data;
        break;
      default: return;
    }
    DeckStore.emitChange(type);
  }),
};

export default DeckStore;