const reCyrillic = /^[А-ЯЁа-яё -]+$/;
const rePassportId = /^\d{2} \d{2} \d{6}$/;
const reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const withRequired = (value, validate, messageValidator) => {
  if (value) {
    return !validate(value) && messageValidator;
  } else {
    return `Обязательно`;
  }
};

export const isCyrillic = (value) => reCyrillic.test(value);
export const isPassportId = (value) => rePassportId.test(value);
export const isEmail = (value) => reEmail.test(value);
