export const notiValidation = {
  empty: "Please do not leave this field empty",
  email: "Please enter a valid email format",
  min: (minValue) => {
    return `Please enter a minimum of ${minValue} characters`;
  },
  max: (maxValue) => {
    return `Please enter a maximum of ${maxValue} characters`;
  },
};
