const validateField = (rules, name, fields) => {
  const errors = rules.map(r => r(name, fields));
  return errors.find(err => Boolean(err)) || '';
};

export default rules => (fields) => {
  const errors = Object.keys(fields).reduce((acc, name) => ({
    ...acc,
    [name]: validateField(rules[name], name, fields),
  }), {});

  const isValid = Object.keys(errors).every(name => !errors[name]);
  return { isValid, errors };
};
