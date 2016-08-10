import * as validators from 'utils/validators';
import { getAge } from 'utils/helpers';

export default {
  firstName: (value) => validators.withRequired(value, validators.isCyrillic, `Может содержать только кириллицу`),
  lastName: (value) => validators.withRequired(value, validators.isCyrillic, `Может содержать только кириллицу`),
  middleName: (value) => validators.withRequired(value, validators.isCyrillic, `Может содержать только кириллицу`),
  email: (value) => validators.withRequired(value, validators.isEmail, `Неверный формат E-mail`),
  passportId: (value) => validators.withRequired(value, validators.isPassportId, `Неверные номер или серия пасспорта`),
  sex: (value) => !value && `Обязательно`,
  autoBrand: (value, { isAutoOwner }) => isAutoOwner.value && !value && `Обязательно`,
  autoModel: (value, { isAutoOwner }) => isAutoOwner.value && !value && `Обязательно`,
  birthday: (value) => {
    if (value) {
      const [day, month, year] = value.split(`/`);
      const date = new Date(year, month, day);

      if (day > 31 || month > 12) {
        return `Неверно указана дата`;
      } else if (!!date && getAge(date) < 18) {
        return `Вы должны быть старше 18-ти лет`;
      }
    } else {
      return `Обязательно`;
    }
  },
};
