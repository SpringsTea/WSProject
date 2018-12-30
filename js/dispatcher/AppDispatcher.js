import { Dispatcher } from 'flux';

const AppDispatcher = new Dispatcher();
const dispatch = AppDispatcher.dispatch.bind(AppDispatcher);
const waitFor = AppDispatcher.waitFor.bind(AppDispatcher);

const register = (receivers, onComplete) => AppDispatcher.register((payload) => {
  if (receivers.hasOwnProperty(payload.type)) {
    receivers[payload.type](payload);
    if (onComplete) onComplete(payload);
  }
});

export default AppDispatcher;
export { register, dispatch, waitFor };
