/**
 * The generic 'store', which more complex stores are composed from
 */
import EventEmitter from 'events';

const CHANGE_EVENT = Symbol('change');

const Store = {
  ...EventEmitter.prototype,
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  reducer: async () => undefined,
};

export default Store;
