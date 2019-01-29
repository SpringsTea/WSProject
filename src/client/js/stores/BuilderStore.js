import Store from './Store';
import { BuilderActions as AT } from '../constants/Actions';
import { register } from '../dispatcher';

let test = {};
let serieslist = [];//Top level list of available series
let buildercards = [];

let deck = [];

const BuilderStore = {
  ...Store,
  getTestData: () => test,
  getSeriesesData: () => serieslist,
  getBuilderCards: () => buildercards,
  getDeckCards: () => deck,
  reducer: register(async ({ type, ...props }) => {
    switch(type) {
      case AT.TEST_RECEIVE:
        test = props.data;
        break;
      case AT.SERIESES_RECEIVE:
        serieslist = props.data;
        break;
      case AT.SERIES_RECEIVE:
        buildercards = props.data;
        break;
      case AT.ADD_DECK_CARD:
        deck.push(props.card);
        break;
      case AT.REMOVE_DECK_CARD:
        let indextoremove = deck.findIndex( (el) => el.id === props.card.id )
        deck.splice(indextoremove, 1);
        break;
      default: return;
    }
    BuilderStore.emitChange();
  }),
};

export default BuilderStore;