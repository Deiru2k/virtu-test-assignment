import * as types from 'constants/form/actions';

export function onChange(form, field, evt, validate) {
  return (dispatch) => {
    return dispatch({ type: types.CHANGE_FIELD, form, field, validate, value: evt.target.value });
  };
}

export function updateForm(form, values) {
  return (dispatch) => {
    return dispatch({ type: types.UPDATE_FORM, form, values });
  };
}
