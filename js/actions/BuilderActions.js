import { dispatch } from '../dispatcher';
import { BuilderActions as AT } from '../constants/Actions';

export const receiveTestData = (data) => dispatch({ type: AT.TEST_RECEIVE, data });