import { handleActions } from 'redux-actions';

import * as types from 'constants/form/actions';

const initialState = {};

export default handleActions({
  [types.CHANGE_FIELD]: (state, { form, field, value, validate = () => {} }) => ({
    ...state,
    [form]: {
      fields: {
        ...((state[form] || {}).fields || {}),
        [field]: {
          value: value,
          error: validate(value, (state[form] || {}).fields || {}),
        },
      },
    },
  }),

  [types.UPDATE_FORM]: (state, { form, values = {} }) => ({
    ...state,
    [form]: {
      fields: {
        ...((state[form] || {}).fields),
        ...values,
      },
    },
  }),
}, initialState);
