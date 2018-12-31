export const BuilderActions = [
  'TEST_RECEIVE',
  'SERIESES_RECEIVE',
  'SERIES_RECEIVE',
].reduce((p, v) => (p[v] = Symbol(v), p), {});
