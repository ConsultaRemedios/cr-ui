import getErrorMessage from './error-messages.js';

import {
  required,
  minLength,
  sameAs,
  email
} from './error-messages.js';

describe('error-messages', () => {
  describe('#required', () => {
    it('returns custom message if there is one', () => {
      expect(required({ message: 'A Custom message error' })).toEqual('A Custom message error');
    });

    it('returns default message if there is not a custom message', () => {
      expect(required({})).toEqual('Campo obrigatório');
    });
  });

  describe('#minLength', () => {
    it('returns custom message if there is one', () => {
      expect(minLength({ min:2, message: 'A Custom message error' }))
        .toEqual('A Custom message error');
    });

    it('returns default message if there is not a custom message', () => {
      expect(minLength({ min: 2 })).toEqual('O campo deve ter no mínimo 2 caracteres');
    });
  });

  describe('#sameAs', () => {
    it('returns custom message if there is one', () => {
      expect(sameAs({ message: 'A Custom message error' })).toEqual('A Custom message error');
    });

    it('returns default message if there is not a custom message', () => {
      expect(sameAs({})).toEqual('O campo deve ser igual ao seu campo de referência');
    });
  });

  describe('#email', () => {
    it('returns custom message if there is one', () => {
      expect(email({ message: 'A Custom message error' })).toEqual('A Custom message error');
    });

    it('returns default message if there is not a custom message', () => {
      expect(email({})).toEqual('O campo deve conter um e-mail válido');
    });
  });

  describe('#getErrorMessage', () => {
    const $vField = {
      $params: {
        minLength: { min: '2' },
        foobar: { zaz: 'bar' }
      }
    };

    describe('When there is a method with the rule name passed as param', () => {
      it('returns the error message', () => {
        getErrorMessage($vField, 'minLength');
      });
    });

    describe('When there is not a method with the rule name passed as param', () => {
      it('throws an error', () => {
        expect(() => {
          getErrorMessage($vField, 'foobar');
        }).toThrow('validator: There is no message defined for foobar');
      });
    });
  });
});
