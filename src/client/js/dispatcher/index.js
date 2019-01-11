const callbacks = [];
export const register = (cb) => callbacks.push(cb);
export const dispatch = (payload) => callbacks.reduce((a, cb) => a.set(cb, cb(payload, a)), new Map());