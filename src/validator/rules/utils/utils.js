export const validate = ({ test, message, defaultMessage }) => {
  if (test) return '';
  return message || defaultMessage;
};

export default validate;
