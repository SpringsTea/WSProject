import Store from './Store';
import { DeckViewActions as AT } from '../constants/Actions';
import { register } from '../dispatcher';

let deck = [];
let selectedCard = {
  card: null,
  location: null,
};

const DeckStore = {
  ...Store,
  getDeckData: () => deck,
  getSelectedCard: () => selectedCard,
  reducer: register(async ({ type, ...props }) => {
    switch(type) {
      case AT.DECK_RECEIVE:
        deck = props.data;
        break;
      case AT.SELECT_CARD:
        selectedCard = {
          card: props.data.card,
          location: props.data.location
        };
        break;
      default: return;
    }
    DeckStore.emitChange(type);
  }),
};

export default DeckStore;