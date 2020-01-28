import { validate } from './utils';

export default (params = {}) => (name, fields) => {
  const { message } = params;

  return validate({
    test: fields[name] !== '',
    message,
    defaultMessage: 'Campo obrigatório',
  });
};
