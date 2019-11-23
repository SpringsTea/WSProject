import Store from './Store';
import { TranslationsActions as AT, BuilderActions } from '../constants/Actions';
import { register } from '../dispatcher';
import { sortall } from 'Utils/cardsort';
import tstub from 'Constants/stubs/Translations'

let serieses = [];
let cards = [];
let translations = tstub;

const TranslationsStore = {
  ...Store,
  getSerieses: () => serieses,
  getSeries: () => cards,
  getTranslations: () => translations,
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
            let cardtranslation = translations.find( (t) => t.cardid === card._id )
            return {...card, locale: card.locale.NP, translation: cardtranslation || { cardid: card._id, name: "", ability: [] }}
          }
          return card;
        })

        break;  
      case AT.TRANSLATION_RECEIVE:

        let index = translations.findIndex( (t) => t.cardid === props.data.cardid )

        if(index >= 0){
          translations[index] = props.data;
        }
        else{
          translations.push(props.data)
        }

        index = cards.findIndex( (c) => c._id === props.data.cardid );
        cards[index].translation = props.data;
        cards[index].edited = true;

        break;
      default: return;
    }
    TranslationsStore.emitChange(type);
  }),
};

export default TranslationsStore;