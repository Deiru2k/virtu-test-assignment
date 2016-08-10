import { handleActions } from 'redux-actions';
import * as types from 'constants/personalInfo/actions';

const initialState = {};

export default handleActions({
  [types.SUBMIT_STARTED]: (state) => ({
    ...state,
    isSubmitting: true,
  }),

  [types.SUBMIT_SUCCEEDED]: (state) => ({
    ...state,
    isSubmitting: false,
  }),

  [types.SUBMIT_FAILED]: (state) => ({
    ...state,
    isSubmitting: false,
  }),
}, initialState);
