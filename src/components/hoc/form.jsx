import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as formActions from 'actions/form';

const prepareAction = (form, field, action, validate) => (value) => action(form, field, value, validate);

const prepareSubmit = (form, fields, validators = {}, values = {}, updateForm) => (callback) => (evt) => {
  evt.preventDefault();
  const newValues = {};
  fields.forEach((field) => {
    const validate = validators[field] || (() => {});
    const fieldValue = values[field] || {};
    const error = validate(fieldValue.value, values);
    const newValue = {
      value: fieldValue.value,
      error,
    };
    newValues[field] = newValue;
  });
  updateForm(form, newValues);
  const errors = fields.map((field) => {
    const { error } = newValues[field] || {};
    return error;
  }).filter(id => id);
  if (!errors.length) {
    callback();
  }
};

export const connectForm = (settings) => (Target) => {
  const pickState = ({ form }) => ({ state: form });
  const mapDispatch = (dispatch) => ({
    actions: bindActionCreators(formActions, dispatch),
  });

  return connect(pickState, mapDispatch)(
    class Form extends Component {
      componentWillMount() {
        const validators = settings.validators || {};
        this.fieldActions = {};
        settings.fields.forEach((field) => {
          this.fieldActions[field] = prepareAction(settings.form, field, this.props.actions.onChange, validators[field]);
        });
        this.initForm();
      }

      initForm() {
        const fields = {};
        settings.fields.forEach((field) => {
          fields[field] = {
            value: undefined,
            error: undefined,
          };
        });
        this.props.actions.updateForm(settings.form, fields);
      }

      render() {
        const { actions, state, ...props } = this.props;
        const formState = state[settings.form] || {};
        const fields = { ...(formState.fields || {}) };
        const values = {};
        const errors = {};
        if (formState.fields) {
          settings.fields.forEach((field) => {
            const stateField = formState.fields[field] || {};
            fields[field] = {
              onChange: this.fieldActions[field],
              ...stateField,
            };
            values[field] = stateField.value;
            errors[field] = stateField.error;
          });
        }

        const form = {
          name: settings.name,
          fields: fields,
          values: values,
          errors: errors,
          handleSubmit: prepareSubmit(settings.form, settings.fields, settings.validators, fields, actions.updateForm),
        };

        return <Target {...props} form={form} />;
      }
    }
  );
};
