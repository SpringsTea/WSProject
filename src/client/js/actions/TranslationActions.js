import { dispatch } from '../dispatcher';
import { TranslationsActions as AT } from '../constants/Actions';
import { throttle } from 'throttle-debounce';

export const editTranslation = throttle( 1000, (data) => dispatch({ type: AT.TRANSLATION_RECEIVE, data }) );
export const savedTranslations = (data) => dispatch({type: AT.TRANSLATIONS_SAVE, data});
export const receiveTranslations = (data) => dispatch({type: AT.TRANSLATIONS_RECEIVE, data});
export const editAttribute = throttle( 1000, (key, value) => dispatch({ type: AT.ATTRIBUTE_CHANGE, key, value }) );