import required from './required';

describe('required', () => {
  it('returns a function', () => {
    expect(typeof required()).toEqual('function');
  });

  describe('When it is valid', () => {
    it('returns empty string', () => {
      const rule = required();
      expect(rule('name', { name: 'a' })).toEqual('');
    });
  });

  describe('When it is invalid', () => {
    describe('with custom message', () => {
      it('returns custom message', () => {
        const rule = required({ message: 'Custom message for required' });
        expect(rule('name', { name: '' })).toEqual('Custom message for required');
      });
    });

    describe('without custom message', () => {
      it('returns default message', () => {
        const rule = required();
        expect(rule('name', { name: '' })).toEqual('Campo obrigatório');
      });
    });
  });
});
