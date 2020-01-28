import creditCardType from 'credit-card-type';

const formatValue = ({
  value,
  gaps = [4, 8, 12, 16],
  lengths = [19],
}) => {
  const numbers = value.replace(/\D/g, '');
  const fieldSize = Math.max(...lengths) + gaps.length;

  return numbers.split('').reduce((acc, n, i) => (
    gaps.includes(i) ? acc.concat(' ', n) : acc.concat(n)
  ), []).join('').slice(0, fieldSize);
};

export default (value) => {
  const types = creditCardType(value);
  const { gaps, type, lengths } = types.length > 0 ? types[0] : {};

  return {
    brand: type,
    formattedValue: formatValue({ value, gaps, lengths }),
  };
};
