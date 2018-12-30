export const BuilderActions = [
  'TEST_RECEIVE',
].reduce((p, v) => (p[v] = Symbol(v), p), {});
