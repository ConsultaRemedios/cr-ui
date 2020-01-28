import { validate } from './utils';

export default (params = {}) => (name, fields) => {
  const { length, message } = params;

  return validate({
    test: !fields[name] || fields[name].length >= length,
    message,
    defaultMessage: `No mínimo ${length} caracteres`,
  });
};
