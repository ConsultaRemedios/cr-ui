import { validate } from './utils';

export default (params = {}) => (name, fields) => {
  const { ref, message } = params;

  return validate({
    test: fields[name] === fields[ref],
    message,
    defaultMessage: 'Deve ser igual ao seu campo de referência',
  });
};
