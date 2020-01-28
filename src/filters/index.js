import VMasker from 'vanilla-masker';

const currencyDefaultOpts = {
  showSymbol: true,
};

export const capitalize = (value) => {
  if (!value) return '';

  const stringValue = value.toString();
  return stringValue.charAt(0).toUpperCase() + stringValue.slice(1);
};

export const pluralize = (count, singular, plural, printNumber = true) => {
  const pluralized = count > 1 ? plural : singular;
  return printNumber ? `${count} ${pluralized}` : pluralized;
};

const formatInteger = (integers, acc, count) => {
  if (!integers.length) return acc;

  const item = integers.pop();

  if (count % 3 === 0 && integers.length) {
    return formatInteger(integers, ['.', item, ...acc], count + 1);
  }

  return formatInteger(integers, [item, ...acc], count + 1);
};

export const currency = (value, opts = currencyDefaultOpts) => {
  const parsedValue = typeof value === 'string' ? parseFloat(value) : value;
  const [integer, decimal] = parsedValue.toFixed(2).split('.');
  const formatedInteger = formatInteger(integer.split(''), [], 1);
  const symbol = opts.showSymbol ? 'R$' : '';

  return `${symbol} ${formatedInteger.join('')},${decimal}`.trim();
};

export const cpf = value => VMasker.toPattern(value, '999.999.999-99');
export const zipcode = value => VMasker.toPattern(value, '99999-999');

export const truncate = (string, length) => {
  if (string.length >= length) {
    return `${string.slice(0, length - 3)}...`;
  }

  return string;
};
