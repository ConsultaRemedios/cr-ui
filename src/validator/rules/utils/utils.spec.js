import { validate } from './utils';

describe('#validate', () => {
  describe('When test is true', () => {
    it('returns empty string', () => {
      expect(validate({ test: true })).toEqual('');
    });
  });

  describe('When test is false', () => {
    describe('and there is message', () => {
      it('returns message', () => {
        expect(validate({
          test: false,
          message: 'Message is here',
          defaultMessage: 'Default message is here'
        })).toEqual('Message is here');
      });
    });

    describe('and there is no message', () => {
      it('returns default message', () => {
        expect(validate({
          test: false,
          defaultMessage: 'Default message is here'
        })).toEqual('Default message is here');
      });
    });
  });
});
