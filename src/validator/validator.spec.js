import validator from './validator';

const validRules = {
  required: () => () => '',
  minLength: () => () => '',
};

const invalidRules = {
  required: () => () => 'Field is required',
  minLength: () => () => 'Field length is less than min length',
};

let formValidator;

describe('Validator', () => {
  describe('First call', () => {
    beforeAll(() => {
      const { required, minLength } = validRules;

      formValidator = validator({
        firstName: [required(), minLength()],
        lastName: [required()]
      });
    });

    it('returns a function', () => {
      expect(typeof formValidator).toEqual('function');
    });
  });

  describe('After calling once', () => {
    describe('When fields are valid', () => {
      beforeAll(() => {
        const { required, minLength } = validRules;

        formValidator = validator({
          firstName: [required(), minLength()],
          lastName: [required()]
        });
      });

      it('returns proper values', () => {
        expect(formValidator({ firstName: 'foo', lastName: 'bar' })).toMatchObject({
          isValid: true,
          errors: {
            firstName: '',
            lastName: ''
          }
        });
      });
    });

    describe('When fields are invalid', () => {
      beforeAll(() => {
        const { required, minLength } = invalidRules;

        formValidator = validator({
          firstName: [required(), minLength()],
          lastName: [required()],
        });
      });

      it('returns proper values', () => {
        expect(formValidator({ firstName: 'foo', lastName: 'bar' })).toMatchObject({
          isValid: false,
          errors: {
            firstName: 'Field is required',
            lastName: 'Field is required',
          },
        });
      });
    });

    describe('When calling without all fields', () => {
      beforeAll(() => {
        formValidator = validator({
          firstName: [validRules.required(), validRules.minLength()],
          lastName: [invalidRules.required()],
        });
      });

      it('only validates the fields passed into call', () => {
        expect(formValidator({ firstName: 'foo' })).toMatchObject({
          isValid: true,
          errors: { firstName: '' },
        });
      });
    });

    describe('When calling with mixed valid and invalid fields', () => {
      beforeAll(() => {
        formValidator = validator({
          firstName: [validRules.required(), validRules.minLength()],
          lastName: [invalidRules.required()],
        });
      });

      it('returns proper values', () => {
        expect(formValidator({ firstName: 'foo', lastName: 'bar' })).toMatchObject({
          isValid: false,
          errors: {
            firstName: '',
            lastName: 'Field is required',
          },
        });
      });
    });

    describe('When field is invalid by more than one rule', () => {
      beforeAll(() => {
        const otherRule = () => () => 'Other rule error message';

        formValidator = validator({
          firstName: [validRules.required(), otherRule(), invalidRules.minLength()],
          lastName: [validRules.required()],
        });
      });

      it('returns the first error message', () => {
        expect(formValidator({ firstName: 'foo', lastName: 'bar' })).toMatchObject({
          isValid: false,
          errors: {
            firstName: 'Other rule error message',
            lastName: '',
          },
        });
      });
    });
  });
});
