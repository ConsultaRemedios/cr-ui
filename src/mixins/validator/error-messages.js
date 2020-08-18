const withCustomMessage = (callback) => (params) => {
  if (params.message) return params.message;
  return callback(params);
};

export const required = withCustomMessage(() => 'Campo obrigatório');

export const minLength = withCustomMessage((params) => (
  `O campo deve ter no mínimo ${params.min} caracteres`
));

export const sameAs = withCustomMessage(() => (
  'O campo deve ser igual ao seu campo de referência'
));

export const email = withCustomMessage(() => (
  'O campo deve conter um e-mail válido'
));

const errorMessages = {
  required,
  minLength,
  sameAs,
  email,
};

export default ($vField, rule) => {
  const errorMessageMethod = errorMessages[rule];
  const params = $vField.$params[rule];

  if (errorMessageMethod) {
    return errorMessageMethod(params);
  }

  throw new Error(`validator: There is no message defined for ${rule}`);
};
