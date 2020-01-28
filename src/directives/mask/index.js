import VMasker from 'vanilla-masker';
import { max } from './../../helpers';

const ctx = '@@mask';

const patterns = {
  cpf: '999.999.999-99',
  phone: ['(99) 9999-9999', '(99) 99999-9999'],
  zipcode: '99999-999',
  date: '99/99/9999',
  money: 'money',
};

const unmask = value => value.replace(/[^a-zA-Z0-9]/g, '');

const unmaskMoney = (value) => {
  let newValue = value.replace(/\D/g, '');
  if (newValue !== '') {
    newValue = (parseFloat(newValue) / 100.0).toFixed(2);
  }
  return newValue;
};

const getInput = el => (
  el.tagName === 'INPUT' ? el : el.querySelector('input')
);

const getPattern = (value, mask) => {
  const pattern = patterns[mask] || mask;

  if (!Array.isArray(pattern)) return pattern;

  if (pattern === 'money') return pattern;

  const unmaskedPatternLengths = pattern.map(p => unmask(p).length);
  const maxLength = max(unmaskedPatternLengths);
  const unmaskedValue = unmask(value);

  return pattern.find((p, i) => (
    unmaskedValue.slice(0, maxLength).length <= unmaskedPatternLengths[i]));
};

const maskInput = (input, mask) => {
  let maskedValue;

  if (mask === 'money') {
    const unmaskedValue = unmaskMoney(input.value);

    if (!unmaskedValue) return;

    maskedValue = VMasker.toMoney(unmaskedValue, {
      precision: 2,
      separator: ',',
      delimiter: '.',
      unit: 'R$',
      zeroCents: false,
    });
  } else {
    const pattern = getPattern(input.value, mask);
    maskedValue = VMasker.toPattern(unmask(input.value), pattern);
  }

  if (input.value === maskedValue) return;

  // eslint-disable-next-line no-param-reassign
  input.value = maskedValue;

  input.dispatchEvent(new Event('input', {
    bubbles: true,
    cancelable: true,
  }));
};

const directive = {
  bind(el, { value }) {
    const input = getInput(el);

    input[ctx] = { maskInput: maskInput.bind(null, input, value) };
    input.addEventListener('input', input[ctx].maskInput);

    input.dispatchEvent(new Event('input', {
      bubbles: true,
      cancelable: true,
    }));
  },

  unbind(el) {
    const input = getInput(el);
    input.removeEventListener('input', input[ctx].maskInput);
  },
};

export default directive;
export { unmask, unmaskMoney, getInput, getPattern, maskInput };
