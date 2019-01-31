import Store from './Store';
import { BuilderActions as AT } from '../constants/Actions';
import { register } from '../dispatcher';

let test = {};
let serieslist = [];//Top level list of available series
let buildercards = [];
let builderfilters = {};

let deck = [];

function filterBuilderCards() {
  buildercards = buildercards.filter( (card) => {

    if (builderfilters['CH'] === false && card.cardtype === 'CH'){
      return false
    }

    if (builderfilters['CX'] === false && card.cardtype === 'CX'){
      return false
    }

    if (builderfilters['EV'] === false && card.cardtype === 'EV'){
      return false
    }

    return true;
  })
}

const BuilderStore = {
  ...Store,
  getTestData: () => test,
  getSeriesesData: () => serieslist,
  getBuilderCards: () => buildercards,
  getBuilderFilters: () => builderfilters,
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
      case AT.FILTER_BUILDER:
        builderfilters[props.data.filter] = props.data.value
        filterBuilderCards()
        break;
      default: return;
    }
    BuilderStore.emitChange();
  }),
};

export default BuilderStore;