import Store from './Store';
import { BuilderActions as AT } from '../constants/Actions';
import { register } from '../dispatcher';

let test = {};

const BuilderStore = {
  ...Store,
  getTestData: () => test,
  reducer: register(async ({ type, ...props }) => {
    switch(type) {

      case AT.TEST_RECEIVE:
        test = props.data;
        break;
      default: return;
    }
    BuilderStore.emitChange();
  }),
};

export default BuilderStore;