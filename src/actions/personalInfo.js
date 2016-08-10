import * as types from 'constants/personalInfo/actions';

export function submitInfo(values) {
  return (dispatch) => {
    dispatch({ type: types.SUBMIT_STARTED });
    console.log(values);

    const request = new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });

    return request.then(
      () => dispatch({ type: types.SUBMIT_SUCCEEDED }),
      () => dispatch({ type: types.SUBMIT_FAILED })
    );
  };
}
