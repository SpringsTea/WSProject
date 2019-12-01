import Store from './Store';
import { TranslationsActions as AT, BuilderActions } from '../constants/Actions';
import { register } from '../dispatcher';
import { sortall } from 'Utils/cardsort';

let serieses = [];
let cards = [];
let translations = [];
let attributes = {};

const TranslationsStore = {
  ...Store,
  getSerieses: () => serieses,
  getSeries: () => cards,
  getTranslations: () => translations,
  getAttributes: () => attributes,
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

            if(!cardtranslation){
              cardtranslation = { cardid: card._id, name: "", ability: [] }
            }

            //Make a key for each unique attribute in the set
            card.locale.NP.attributes.map((attr) => {
              if( !attributes[attr] ){
                attributes[attr] = attr;
              }            
            })
            return {...card, locale: card.locale.NP, translation: cardtranslation}
          }
          else{
            return card;
          }          
        })

        break; 
      case AT.TRANSLATIONS_RECEIVE:
        if( props.data ){
          translations = props.data.translations;
          attributes = props.data.attributes;
        }
        else{
          translations = [];
        }        
        break; 
      case AT.TRANSLATION_RECEIVE:

        let index = translations.findIndex( (t) => t.cardid === props.data.cardid )

        if(index >= 0){
          translations[index] = {...props.data, edited: true};
        }
        else{
          translations.push({...props.data, edited: true})
        }

        index = cards.findIndex( (c) => c._id === props.data.cardid );
        cards[index].translation = {...props.data, edited: true};
        break;
      case AT.TRANSLATIONS_SAVE:
        translations = translations.map( (t) => ({...t, edited: false}) )
        cards = cards.map( (c) => {
          let card = c;
          c.translation.edited = false;
          return card;
        })
        break;
      case AT.ATTRIBUTES_RECEIVE:
        attributes = props.data;
        break;
      default: return;
    }
    TranslationsStore.emitChange(type);
  }),
};

export default TranslationsStore;