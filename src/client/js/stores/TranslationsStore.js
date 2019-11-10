import Store from './Store';
import { TranslationsActions as AT, BuilderActions } from '../constants/Actions';
import { register } from '../dispatcher';
import { sortall } from 'Utils/cardsort';

let serieses = [];
let cards = [];

const TranslationsStore = {
  ...Store,
  getSerieses: () => serieses,
  getSeries: () => cards,
  reducer: register(async ({ type, ...props }) => {
    switch(type) {
      case BuilderActions.SERIESES_RECEIVE:
        serieses = props.data.sort( (a,b) =>{
          if(a.name < b.name) { return -1; }
          if(a.name > b.name) { return 1; }
          return 0;
        });
        break;
      case BuilderActions.SERIES_RECEIVE:
        cards = props.data.sort(sortall)

        cards = cards.map( (card) =>  {
          if( card.locale.NP ){
            return {...card, locale: card.locale.NP}
          }
          return card;
        })

        break;    
      default: return;
    }
    TranslationsStore.emitChange(type);
  }),
};

export default TranslationsStore;