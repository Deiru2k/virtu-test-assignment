import React from 'react';
import { Provider } from 'react-redux';

import { Grid } from 'react-bootstrap/lib';

import Form from 'containers/Form';
import store from 'config/store';

export default class extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Grid>
          <Form />
        </Grid>
      </Provider>
    );
  }
}
