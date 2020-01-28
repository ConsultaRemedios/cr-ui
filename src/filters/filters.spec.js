import { capitalize, currency, pluralize, truncate } from './index.js';

describe('#filters' ,() => {
  describe('#capitalize', () => {
    it('capitalize one sentence', () => {
      const sentence = 'hello, what are you doing here?';
      expect(capitalize(sentence)).toBe('Hello, what are you doing here?');
    });

    it('capitalize other sentence', () => {
      const sentence = 'this field is required';
      expect(capitalize(sentence)).toBe('This field is required');
    });
  });

  describe('#pluralize', () => {
    describe('default behavior', () => {
      describe('with number greater than 1', () => {
        it('returns the number plus word in the plural form', () => {
          expect(pluralize(2, 'pessoa', 'pessoas')).toBe('2 pessoas');
          expect(pluralize(3, 'carro', 'carros')).toBe('3 carros');
          expect(pluralize(11, 'caneta', 'canetas')).toBe('11 canetas');
        });
      });

      describe('with number equal to 1', () => {
        it('returns the number plus word in the singular form', () => {
          expect(pluralize(1, 'pessoa', 'pessoas')).toBe('1 pessoa');
          expect(pluralize(1, 'carro', 'carros')).toBe('1 carro');
          expect(pluralize(1, 'caneta', 'canetas')).toBe('1 caneta');
        });
      });
    });

    describe('setting printNumber to false', () => {
      describe('with number greater then 1', () => {
        it('returns word in the plural form', () => {
          expect(pluralize(2, 'pessoa', 'pessoas', false)).toBe('pessoas');
          expect(pluralize(3, 'carro', 'carros', false)).toBe('carros');
          expect(pluralize(11, 'caneta', 'canetas', false)).toBe('canetas');
        })
      });

      describe('with number equal to 1', () => {
        it('returns word in the singular form', () => {
          expect(pluralize(1, 'pessoa', 'pessoas', false)).toBe('pessoa');
          expect(pluralize(1, 'carro', 'carros', false)).toBe('carro');
          expect(pluralize(1, 'caneta', 'canetas', false)).toBe('caneta');
        });
      });
    });
  });

  describe('#currency', () => {
    it('transform 10.5 to brazilian currency format', () => {
      const value = 10.5;
      expect(currency(value)).toBe('R$ 10,50');
    });

    it('transform 195.93 to brazilian currency format', () => {
      const value = 195.93;
      expect(currency(value)).toBe('R$ 195,93');
    });

    it('transform 3257 to brazilian currency format', () => {
      const value = 3257;
      expect(currency(value)).toBe('R$ 3.257,00');
    });

    it('transform 9982.9 to brazilian currency format', () => {
      const value = 9982.9;
      expect(currency(value)).toBe('R$ 9.982,90');
    });

    it('transform 23422.3333 to brazilian currency format', () => {
      const value = 23422.3333;
      expect(currency(value)).toBe('R$ 23.422,33');
    });

    it('transform 553491.1523 to brazilian currency format', () => {
      const value = 553491.15;
      expect(currency(value)).toBe('R$ 553.491,15');
    });

    it('transform 12989522.278 to brazilian currency format', () => {
      const value = 12989522.27;
      expect(currency(value)).toBe('R$ 12.989.522,27');
    });

    describe('When "showSymbol" is "false"', () => {
      const opts = { showSymbol: false };

      it('transforms "123.45" to currency format', () => {
        const value = 123.45;
        expect(currency(value, opts)).toBe('123,45');
      });

      it('transforms "1234567.89" to currency format', () => {
        const value = 1234567.89;
        expect(currency(value, opts)).toBe('1.234.567,89');
      });
    });
  });

  describe('#truncate', () => {
    it('truncates the string based on length passed into it', () => {
      const string1 = 'Esomeprazol Magnésico - Nova Química 40mg 2 blísteres com 7 comprimidos revestidos';
      const string2 = 'Viagra 50mg, caixa com 1 comprimido revestido';

      expect(truncate(string1, 50)).toEqual('Esomeprazol Magnésico - Nova Química 40mg 2 blí...');
      expect(truncate(string2, 20)).toEqual('Viagra 50mg, caix...');
    });
  });
});
