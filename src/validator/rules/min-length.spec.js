import minLength from './min-length';

describe('minLength', () => {
  it('returns a function', () => {
    expect(typeof minLength()).toEqual('function');
  });

  it('is valid when the value is an empty string', () => {
    const rule = minLength({ length: 3 });
    expect(rule('name', { name: '' })).toEqual('');
  });

  it('is valid when the value is undefined', () => {
    const rule = minLength({ length: 3 });
    expect(rule('name', { name: undefined })).toEqual('');
  });

  it('is valid when the value is null', () => {
    const rule = minLength({ length: 3 });
    expect(rule('name', { name: null })).toEqual('');
  });

  describe('When it is valid', () => {
    it('returns empty string', () => {
      const rule = minLength({ length: 3 });
      expect(rule('name', { name: 'asd' })).toEqual('');
    });
  });

  describe('When it is invalid', () => {
    describe('with custom message', () => {
      it('returns custom message', () => {
        const rule = minLength({ length: 3, message: 'Custom message for min length' });
        expect(rule('name', { name: 'as' })).toEqual('Custom message for min length');
      });
    });

    describe('without custom message', () => {
      it('returns default message', () => {
        const rule = minLength({ length: 3 });
        expect(rule('name', { name: 'as' })).toEqual('No mínimo 3 caracteres');
      });
    });
  });
});
