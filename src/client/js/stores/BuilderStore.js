import Store from './Store';
import { BuilderActions as AT } from '../constants/Actions';
import { sortall } from '../utils/cardsort';
import { register } from '../dispatcher';

let serieslist = [];//Top level list of available series
let buildercards = [];
let fbuildercards = [];//Buildercards after filters
let builderfilters = {
  cardtype: [],
  colour: [],
  level: [],
  text: null
};
let deckdata = {

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

    //Match search text
    if( builderfilters.text){
      //TODO need a better way of selecting locale
      let cardname = ''; 

      if(card.locale.EN.name){
        cardname = card.locale.EN.name;
      }
      else if(card.locale.NP.name){
        cardname = card.locale.NP.name;
      }

      return cardname.toUpperCase().includes( builderfilters.text.toUpperCase()) 
      || card.sid.toUpperCase().includes( builderfilters.text.toUpperCase() )
    }

    return true;
  })
}

const BuilderStore = {
  ...Store,
  getSeriesesData: () => serieslist,
  getBuilderCards: () => fbuildercards,
  getBuilderFilters: () => builderfilters,
  getDeckCards: () => Object.assign([],deck),//assigning this instead of mutating lets me compare in Deck.shouldComponentUpdate,
  getDeckData: () => deckdata,
  getSelectedCard: () => selectedCard,
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

        buildercards = buildercards.sort(sortall);
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

        if( props.data.type === 'text' ){
          builderfilters.text = props.data.value;
        }
        else if( props.data.value === true ){//Add value onto type array
            builderfilters[props.data.type].push(props.data.filter);
        }
        else{//Remove value from type array
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