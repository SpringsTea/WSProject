import { dispatch } from '../dispatcher';
import { BuilderActions as AT } from '../constants/Actions';

export const receiveTestData = (data) => dispatch({ type: AT.TEST_RECEIVE, data });
export const receiveSerieses = (data) => dispatch({ type: AT.SERIESES_RECEIVE, data });
export const receiveSeries = (data) => dispatch({ type: AT.SERIES_RECEIVE, data });