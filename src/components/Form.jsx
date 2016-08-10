import React, { Component } from 'react';
import {
  Row, Col,
  FormGroup, FormControl, ControlLabel, HelpBlock,
  Radio, Button,
} from 'react-bootstrap/lib';
import MaskedInputField from 'react-maskedinput';
import cn from 'classnames';

import { FormEvent } from 'utils/event';
import Select from 'components/Select';
import { autoBrands, autoModels } from 'constants/dictionaries';

import { connectForm } from 'components/hoc/form';
import validators from 'validators/personalInfo';
import { isFormError } from 'utils/helpers';
const formSettings = {
  form: `personalInfo`,
  validators,
  fields: [
    `firstName`,
    `middleName`,
    `lastName`,
    `birthday`,
    `sex`,
    `passportId`,
    `email`,
    `isAutoOwner`,
    `autoBrand`,
    `autoModel`,
  ],
};

const FieldGroup = ({ id, label, error, mask, ...props }) => (
  <FormGroup controlId={id} validationState={isFormError(error)}>
    <ControlLabel>{label}</ControlLabel>
    {!mask && <FormControl {...props} />}
    {!!mask && <MaskedInputField className={cn(props.className, `form-control`)} mask={mask} {...props} />}
    {error && <HelpBlock>{error}</HelpBlock>}
  </FormGroup>
);

class Form extends Component {
  changeRadioField(value, field) {
    if (field.value !== value) field.onChange(FormEvent(value));
  }

  render() {
    const { fields, values, errors, handleSubmit } = this.props.form;

    return (
      <Row>
        <Col md={12} >
          <form onSubmit={handleSubmit(() => this.props.submit(values))}>
            <FieldGroup name="lastName" id="formControlsText" type="text" label="Фамилия" {...fields.firstName} />
            <FieldGroup name="firstName" id="formControlsText" type="text" label="Имя" {...fields.lastName} />
            <FieldGroup name="middleName" id="formControlsText" type="text" label="Отчество" {...fields.middleName} />
            <FieldGroup name="birthday" id="formControlsText" type="text" label="Дата рождения" mask="11/11/1111" {...fields.birthday} />

            <FormGroup validationState={isFormError(errors.sex)}>
              <ControlLabel>Пол</ControlLabel><br />
              <Radio inline checked={values.sex === `male`} onChange={() => this.changeRadioField(`male`, fields.sex)}>Муж.</Radio>
              <Radio inline checked={values.sex === `female`} onChange={() => this.changeRadioField(`female`, fields.sex)}>Жен.</Radio>
              {errors.sex && <HelpBlock>{errors.sex}</HelpBlock>}
            </FormGroup>

            <FieldGroup name="passportId" id="formControlsText" type="text" label="Серия и номер пасспорта" mask="11 11 111111" {...fields.passportId} />
            <FieldGroup name="email" id="formControlsText" type="text" label="Электронная почта" {...fields.email} />

            <FormGroup>
              <ControlLabel>Авто</ControlLabel><br />
              <Radio inline checked={values.isAutoOwner} onChange={() => this.changeRadioField(true, fields.isAutoOwner)}>Есть</Radio>
              <Radio inline checked={!values.isAutoOwner} onChange={() => this.changeRadioField(false, fields.isAutoOwner)}>Нет</Radio>
            </FormGroup>

            {!!values.isAutoOwner && (
              <section>
                <FormGroup controlId="formControlsSelect" validationState={isFormError(errors.autoBrand)}>
                  <ControlLabel>Марка автомобиля</ControlLabel>
                  <Select options={autoBrands} {...fields.autoBrand} />
                  {errors.autoBrand && <HelpBlock>{errors.autoBrand}</HelpBlock>}
                </FormGroup>

                <FormGroup controlId="formControlsSelect" validationState={isFormError(errors.autoModel)}>
                  <ControlLabel>Модель автомобиля</ControlLabel>
                  <Select options={autoModels} dependsOn={values.autoBrand} {...fields.autoModel} />
                  {errors.autoModel && <HelpBlock>{errors.autoModel}</HelpBlock>}
                </FormGroup>
              </section>
            )}

            <FormGroup>
              <Col sm={10}>
                <Button type="submit" disabled={this.props.isSubmitting}>
                  Отправить
                </Button>
                {this.props.isSubmitting && <div className="text-warning">Выполняю отправку</div>}
              </Col>
            </FormGroup>
          </form>
        </Col>
      </Row>
    );
  }
}

export default connectForm(formSettings)(Form);
