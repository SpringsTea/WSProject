import Store from './Store';
import { DeckViewActions as AT } from '../constants/Actions';
import { register } from '../dispatcher';

let deck = [];
let selectedCard = {
  card: null,
  lock: false,
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
        //when a selected card is locked, hover event will not not change selected card
        if( props.lock ){
          if( props.data.card._id === selectedCard.card._id ){
            selectedCard.lock = !selectedCard.lock;
          }
          else{
            selectedCard = {
              lock: true,
              card: props.data.card
            }
          }
        }
        else if( selectedCard.lock === false ){
          selectedCard.card = props.data.card;
        }
        break;
      default: return;
    }
    DeckStore.emitChange(type);
  }),
};

export default DeckStore;