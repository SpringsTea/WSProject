import Store from './Store';
import { BuilderActions as AT } from '../constants/Actions';
import { sortall, sortcardcode } from '../utils/cardsort';
import { register } from '../dispatcher';
import { getLocale } from 'Utils/cardlocale';

let serieslist = [];//Top level list of available series
let buildercards = [];
let fbuildercards = [];//Buildercards after filters
let attributes = new Set([]);
let builderfilters = {
  cardtype: [],
  colour: [],
  level: [],
  attributes: [],
  text: null,
  sorttype: 'standard'
};
let deckdata = {
  cards: []
};
let deck = [];
let selectedCard = {
  card: null,
  lock: false,
};

function filterBuilderCards() {
  fbuildercards = buildercards.filter( (card) => {

    if( builderfilters.cardtype.length > 0 && !builderfilters.cardtype.includes( card.cardtype ) ){
      return false;
    }

    if( builderfilters.level.length > 0 && !builderfilters.level.includes( card.level ) ){
      return false;
    }

    if( builderfilters.colour.length > 0 && !builderfilters.colour.includes( card.colour ) ){
      return false;
    }
    if( builderfilters.attributes.length > 0 && //Check cards for any 1 attribute matching builderfilters.attributes
      !builderfilters.attributes.filter(val => getLocale(card).attributes.includes(val)).length > 0 ){
      return false;
    }

    //Match search text
    if( builderfilters.text){
      let cardname = getLocale(card).name; 

      return cardname.toUpperCase().includes( builderfilters.text.toUpperCase()) 
      || card.sid.toUpperCase().includes( builderfilters.text.toUpperCase() )
    }

    return true;
  })
}

function sortBuilderCards(){
  let sortfunc = sortall;
  switch(builderfilters.sorttype){
    case 'standard':
      sortfunc = sortall;
      break;
    case 'cardcode':
      sortfunc = sortcardcode;
      break;
    default:
      sortfunc = sortall;
      break;
  }
  buildercards = buildercards.sort(sortfunc);
}

const BuilderStore = {
  ...Store,
  getSeriesesData: () => serieslist,
  getBuilderCards: () => fbuildercards,
  getBuilderFilters: () => builderfilters,
  getDeckCards: () => Object.assign([],deck),//assigning this instead of mutating lets me compare in Deck.shouldComponentUpdate,
  getDeckData: () => deckdata,
  getSelectedCard: () => selectedCard,
  getCardAttributes: () => Array.from(attributes),
  reducer: register(async ({ type, ...props }) => {
    switch(type) {
      case AT.SERIESES_RECEIVE:
        serieslist = props.data.sort((a, b)=> (a.name < b.name ? -1: 1 ));
        break;
      case AT.SERIES_RECEIVE:
        if(props.remove === false){
          buildercards = buildercards.concat(props.data)
        }
        else{
          //On remove, props.data = seriesid
          let seriesToRemove = serieslist.find( (s) => s._id == props.data );
          buildercards = buildercards.filter( ( card ) => {
            return card.side + card.release != seriesToRemove.side + seriesToRemove.release;
          })

        }
        attributes = new Set([]);//recalculate all unique card attributes
        buildercards.map((card) => {
          let locale = getLocale(card);
          locale.attributes.map((attr) => (!!attr && attr.length > 1) ? attributes.add(attr) : '' )
        })
        sortBuilderCards();
        filterBuilderCards()
        break;
      case AT.CARDS_CLEAR:
        buildercards = [];
        filterBuilderCards()
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
      case AT.DECK_RECEIVE: 
        //Receive a whole deck at once, for deck editing
        deckdata = props.data;
        deck = props.data.cards;
        break;
      case AT.ADD_DECK_CARD:
        deck.push(props.card);
        break;
      case AT.REMOVE_DECK_CARD:
        let indextoremove = deck.findIndex( (el) => el._id === props.card._id )

        deck.splice(indextoremove, indextoremove >= 0 ? 1 : 0);
        break;
      case AT.FILTER_BUILDER:
        if( props.data.type === 'text' || props.data.type === 'sorttype' ){
          builderfilters[props.data.type] = props.data.value;
        }
        else if( props.data.value === true ){//Add value onto type array
            builderfilters[props.data.type].push(props.data.filter);
        }
        else{//Remove value from type array
          builderfilters[props.data.type].splice( builderfilters[props.data.type].indexOf(props.data.filter), 1 )
        }

        if(props.data.type === 'sorttype'){
            sortBuilderCards();
        }
        
        filterBuilderCards()
        break;
      default: return;
    }
    BuilderStore.emitChange(type);
  }),
};

export default BuilderStore;