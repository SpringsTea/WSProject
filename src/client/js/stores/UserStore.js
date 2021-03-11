import Store from './Store';
import { UserActions as AT } from '../constants/Actions';
import { register } from '../dispatcher';

let user = {};

const UserStore = {
  ...Store,
  getUser: () => user,
  reducer: register(async ({ type, ...props }) => {
    switch(type) {
      case AT.USER_RECEIVE:
        user = props.data;
        break;
      default: return;
    }
    UserStore.emitChange(type);
  }),
};

export default UserStore;