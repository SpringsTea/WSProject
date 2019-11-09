import Store from './Store';
import { TranslationsActions as AT, BuilderActions } from '../constants/Actions';
import { register } from '../dispatcher';

let serieses = [];

const TranslationsStore = {
  ...Store,
  getSerieses: () => serieses,
  reducer: register(async ({ type, ...props }) => {
    switch(type) {
      case BuilderActions.SERIESES_RECEIVE:
        serieses = props.data;
        break;       
      default: return;
    }
    TranslationsStore.emitChange(type);
  }),
};

export default TranslationsStore;