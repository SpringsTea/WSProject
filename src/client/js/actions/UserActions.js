import { dispatch } from '../dispatcher';
import { UserActions as AT } from '../constants/Actions';

export const receiveUser = (data) => dispatch({ type: AT.USER_RECEIVE, data });