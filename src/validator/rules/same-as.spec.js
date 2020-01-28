import sameAs from './same-as';

describe('required', () => {
  it('returns a function', () => {
    expect(typeof sameAs()).toEqual('function');
  });

  describe('When it is valid', () => {
    it('returns empty string', () => {
      const rule = sameAs({ ref: 'password' });

      expect(rule('passwordConfirmation', {
        password: '12345678',
        passwordConfirmation: '12345678'
      })).toEqual('');
    });
  });

  describe('When it is invalid', () => {
    describe('with custom message', () => {
      it('returns custom message', () => {
        const rule = sameAs({ ref: 'password', message: 'Custom message for sameAs' });

        expect(rule('passwordConfirmation', {
          password: '1234678',
          passwordConfirmation: '123412345'
        })).toEqual('Custom message for sameAs');
      });
    });

    describe('without custom message', () => {
      it('returns default message', () => {
        const rule = sameAs({ ref: 'password' });

        expect(rule('passwordConfirmation', {
          password: '1234678',
          passwordConfirmation: '123412345'
        })).toEqual('Deve ser igual ao seu campo de referência');
      });
    });
  });
});
