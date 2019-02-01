import Store from './Store';
import { BuilderActions as AT } from '../constants/Actions';
import { sortall } from '../utils/cardsort';
import { register } from '../dispatcher';

let test = {};
let serieslist = [];//Top level list of available series
let buildercards = [];
let fbuildercards = [];//Buildercards after filters
let builderfilters = {
  cardtype: [],
};

let deck = [];
let selectedCard = {
  card: null,
  location: null,
};

function filterBuilderCards() {
  console.log('Filter buildercards');
  fbuildercards = buildercards.filter( (card) => {

    if( builderfilters.cardtype.includes( card.cardtype ) ){
      return false;
    }

    return true;
  })
}

const BuilderStore = {
  ...Store,
  getTestData: () => test,
  getSeriesesData: () => serieslist,
  getBuilderCards: () => fbuildercards,
  getBuilderFilters: () => builderfilters,
  getDeckCards: () => deck,
  getSelectedCard: () => selectedCard,
  reducer: register(async ({ type, ...props }) => {
    switch(type) {
      case AT.TEST_RECEIVE:
        test = props.data;
        break;
      case AT.SERIESES_RECEIVE:
        serieslist = props.data;
        break;
      case AT.SERIES_RECEIVE:
        buildercards = sortall(props.data);
        filterBuilderCards()
        break;
      case AT.SELECT_CARD:
        selectedCard = {
          card: props.data.card,
          location: props.data.location
        };
        break;
      case AT.ADD_DECK_CARD:
        deck.push(props.card);
        break;
      case AT.REMOVE_DECK_CARD:
        let indextoremove = deck.findIndex( (el) => el._id === props.card._id )
        deck.splice(indextoremove, 1);
        break;
      case AT.FILTER_BUILDER:

        if( props.data.value === false ){
            builderfilters[props.data.type].push(props.data.filter);
        }
        else{
          builderfilters[props.data.type].splice( builderfilters[props.data.type].indexOf(props.data.filter), 1 )
        }
        
        filterBuilderCards()
        break;
      default: return;
    }
    BuilderStore.emitChange(type);
  }),
};

export default BuilderStore;