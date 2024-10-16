export const notiValidation = {
  empty: "Please do not leave this field empty",
  email: "Please enter a valid email format",
  min: (minValue) => {
    return `Please enter a minimum of ${minValue} characters`;
  },
  max: (maxValue) => {
    return `Please enter a maximum of ${maxValue} characters`;
  },
  notAllowNumber: "No numbers or special characters allowed",
  phone: "Please enter a valid Vietnamese phone number starting with 0 or +84",
  password:
    "The password must be 8-20 characters and must contain at least one lowercase, one uppercase, one special character, and one number",
};
