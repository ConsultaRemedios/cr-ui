import { validate } from './utils';

export default (params = {}) => (name, fields) => {
  const { message } = params;

  const emailRegex = /(^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/;

  return validate({
    test: !fields[name] || emailRegex.test(fields[name]),
    message,
    defaultMessage: 'E-mail inválido',
  });
};
