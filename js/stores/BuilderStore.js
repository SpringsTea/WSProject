import Store from './Store';
import { BuilderActions as AT } from '../constants/Actions';
import { register } from '../dispatcher';

let test = {};
let serieslist = [];//Top level list of available series
let buildercards = [];

const BuilderStore = {
  ...Store,
  getTestData: () => test,
  getSeriesesData: () => serieslist,
  getBuilderCards: () => buildercards,
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
      default: return;
    }
    BuilderStore.emitChange();
  }),
};

export default BuilderStore;