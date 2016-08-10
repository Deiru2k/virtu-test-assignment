import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as infoActions from 'actions/personalInfo';

import Form from 'components/Form';

class FormContainer extends Component {
  constructor() {
    super();

    this.submitInfo = ::this.submitInfo;
  }

  submitInfo(values) {
    return this.props.actions.submitInfo(values);
  }

  render() {
    const { isSubmitting } = this.props.state.personalInfo;

    return <Form isSubmitting={isSubmitting} submit={this.submitInfo} />;
  }
}

const pickState = ({ personalInfo }) => ({
  state: { personalInfo },
});
const mapDispatch = (dispatch) => ({
  actions: bindActionCreators(infoActions, dispatch),
});

export default connect(pickState, mapDispatch)(FormContainer);
