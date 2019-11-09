import Store from './Store';
import { TranslationsActions as AT, BuilderActions } from '../constants/Actions';
import { register } from '../dispatcher';

let serieses = [];
let series = [];

const TranslationsStore = {
  ...Store,
  getSerieses: () => serieses,
  getSeries: () => series,
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
        series = props.data.sort( (a,b) =>{
          if(a.sid < b.sid) { return -1; }
          if(a.sid > b.sid) { return 1; }
          return 0;
        });
        break;    
      default: return;
    }
    TranslationsStore.emitChange(type);
  }),
};

export default TranslationsStore;