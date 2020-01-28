import Vue from 'vue';
import { mount } from '@vue/test-utils';

jest.doMock('vuelidate', () => ({
  validationMixin: {}
}));

const validator = require('./validator.js').default;

describe('Validator mixin', () => {
  let $v;

  const mountValidator = ($v) => {
    const Component = Vue.component('FakeComponent', {
      mixins: [validator],
      template: '<div>Foo</div>',
      validations: {
        name: {},
        email: {},
      },
    });

    return mount(Component, { computed: { $v: () => $v } });
  };

  beforeEach(() => {
    jest.clearAllMocks();

    $v = {
      $touch: jest.fn(),
      $dirty: false,
      name: {
        required: true,
        minLength: true,
        $params: {
          required: {},
          minLength: {}
        }
      },

      email: {
        required: true,
        email: true,
        $params: {
          required: {},
          email: {}
        }
      },

      $params: {
        name: null,
        email: null,
      }
    };
  });

  describe('Lifecycle', () => {
    describe('#mounted', () => {
      it('builds errors object', () => {
        const wrapper = mountValidator($v);

        expect(wrapper.vm.errors).toEqual({
          name: '',
          email: ''
        });
      });
    });
  });

  describe('Methods', () => {
    describe('#fieldError', () => {
      describe('When field has error', () => {
        it('returns field error', () => {
          const wrapper = mountValidator($v);
          wrapper.vm.errors.name = 'Name has error';
          expect(wrapper.vm.fieldError('name')).toEqual('Name has error');
        });
      });

      describe('When field has no error', () => {
        it('returns an empty string', () => {
          const wrapper = mountValidator($v);
          expect(wrapper.vm.fieldError('name')).toEqual('');
        });
      });
    });

    describe('#setFieldError', () => {
      it('sets field errors', () => {
        const wrapper = mountValidator($v);

        // There is no age attribute because there is no
        // client validation on it
        expect(wrapper.vm.errors).toEqual({
          name: '',
          email: '',
        });

        wrapper.vm.setFieldError({
          name: 'an error on name',
          email: 'an error on email',
          age: 'an error on age'
        });

        expect(wrapper.vm.errors).toEqual({
          name: 'an error on name',
          email: 'an error on email',
          age: 'an error on age'
        });
      });

      it('sets the first error as field error if the error is an array', () => {
        const wrapper = mountValidator($v);

        // There is no age attribute because there is no
        // client validation on it
        expect(wrapper.vm.errors).toEqual({
          name: '',
          email: '',
        });

        wrapper.vm.setFieldError({
          name: 'an error on name',
          email: ['an error on email', ' a second error message'],
          age: ['an error on age', 'second age error']
        });

        expect(wrapper.vm.errors).toEqual({
          name: 'an error on name',
          email: 'an error on email',
          age: 'an error on age'
        });
      });
    });

    describe('#validateField', () => {
      describe('When the field already has error before calling validateField', () => {
        it('clears the error if the field is valid', () => {
          const wrapper = mountValidator($v);
          wrapper.vm.errors.name = 'Name has error';
          wrapper.vm.validateField('name')
          expect(wrapper.vm.errors.name).toEqual('');
        });
      });

      it('sets field as touched', () => {
        const wrapper = mountValidator($v);

        expect($v.$touch).not.toHaveBeenCalled();

        wrapper.vm.validateField('name')

        expect($v.$touch).toHaveBeenCalledTimes(1);
      });

      describe('When there is error on field', () => {
        it('sets error field if there is one', () => {
          $v.email.required = false;
          const wrapper = mountValidator($v);
          wrapper.vm.validateField('email');
          expect(wrapper.vm.errors.email).toEqual('Campo obrigatório');
        });

        it('returns false', () => {
          $v.email.required = false;
          const wrapper = mountValidator($v);
          expect(wrapper.vm.validateField('email')).toEqual(false);
        });
      });

      describe('When there is no error on field', () => {
        it('clears error field', () => {
          const wrapper = mountValidator($v);
          wrapper.vm.validateField('email');
          expect(wrapper.vm.errors.name).toEqual('');
        });

        it('returns true', () => {
          const wrapper = mountValidator($v);
          expect(wrapper.vm.validateField('email')).toEqual(true);
        });
      });
    });

    describe('#validateForm', () => {
      describe('When form is valid', () => {
        it('clear fields errors', () => {
          const wrapper = mountValidator($v);
          wrapper.vm.validateForm();
          expect(wrapper.vm.errors.name).toEqual('');
          expect(wrapper.vm.errors.email).toEqual('');
        });

        it('returns true', () => {
          const wrapper = mountValidator($v);
          expect(wrapper.vm.validateForm()).toEqual(true);
        });
      });

      describe('When form is invalid', () => {
        it('sets fields errors', () => {
          $v.name.required = false;
          $v.email.email = false;
          const wrapper = mountValidator($v);

          wrapper.vm.validateForm();

          expect(wrapper.vm.errors.name).toEqual('Campo obrigatório');
          expect(wrapper.vm.errors.email).toEqual('O campo deve conter um e-mail válido');
        });

        it('returns false', () => {
          $v.name.required = false;
          $v.email.email = false;

          const wrapper = mountValidator($v);
          expect(wrapper.vm.validateForm()).toEqual(false);
        });
      });
    });
  });

  describe('Computed', () => {
    describe('#isFormValid', () => {
      describe('When form is not dirty', () => {
        it('returns false', () => {
          const wrapper = mountValidator($v);
          expect(wrapper.vm.isFormValid).toEqual(true);
        });
      });

      describe('When form is dirty', () => {
        it('returns true if form has errors', () => {
          $v.$dirty = true;
          $v.email.email = false;
          const wrapper = mountValidator($v);
          expect(wrapper.vm.isFormValid).toEqual(true);
        });

        it('returns true if form has no errors', () => {
          $v.$dirty = true;
          const wrapper = mountValidator($v);
          expect(wrapper.vm.isFormValid).toEqual(true);
        });
      });
    });
  });
});
