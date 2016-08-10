export const isFormError = (error) => !!error ? `error` : undefined;

export const getAge = (value) => {
  const today = new Date();
  const age = today.getFullYear() - value.getFullYear();
  const delta = today.getMonth() - value.getMonth();
  if (delta < 0 || (delta === 0 && today.getDate() < value.getDate())) {
    return age - 1;
  } else {
    return age;
  }
};
