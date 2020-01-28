import { shallowMount } from '@vue/test-utils';
import FormError from './FormError.vue';

describe('FormError Component', () => {
  beforeEach(() => {
    jest.spyOn(window, 'scrollTo');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Computed Props', () => {
    describe('#errorList', () => {
      describe('Errors prop as a string', () => {
        it('returns an array with the error object', () => {
          const component = shallowMount(FormError, {
            propsData: { errors: 'error one' },
          });

          expect(component.vm.errorList).toMatchObject({
            withKeys: [],
            withoutKeys: ['error one'],
          });
        });
      });

      describe('Errors prop as an Array', () => {
        it('returns an array with the errors as objects', () => {
          const component = shallowMount(FormError, {
            propsData: { errors: ['error one', 'error two', 'error three'] },
          });

          expect(component.vm.errorList).toMatchObject({
            withKeys: [],
            withoutKeys: [
              'error one',
              'error two',
              'error three'
            ]
          });
        });
      });

      describe('Errors prop as an Object', () => {
        describe('With blacklist', () => {
          it('returns an array with the errors as objects', () => {
            const errors = {
              name: 'required',
              cpf: ['required', 'invalid'],
              base: 'a base error happened',
              transaction: ['transaction erro one', 'transaction error two'],
            };

            const result = {
              withKeys: [
                {
                  field: 'name',
                  errors: ['required']
                },
                {
                  field: 'cpf',
                  errors: ['required', 'invalid']
                },
              ],
              withoutKeys: [
                'a base error happened',
                'transaction erro one',
                'transaction error two',
              ],
            };

            const component = shallowMount(FormError, {
              propsData: { errors, blackList: ['base', 'transaction'] },
            });

            expect(component.vm.errorList).toMatchObject(result);
          });
        });

        describe('Without blacklist', () => {
          it('returns an array with the errors as objects', () => {
            const errors = {
              name: 'required',
              cpf: ['required', 'invalid'],
              base: 'a base error happened',
              transaction: ['transaction erro one', 'transaction error two'],
            };

            const result = {
              withKeys: [
                {
                  field: 'name',
                  errors: ['required']
                },
                {
                  field: 'cpf',
                  errors: ['required', 'invalid']
                },
                {
                  field: 'base',
                  errors: ['a base error happened'],
                },
                {
                  field: 'transaction',
                  errors: ['transaction erro one', 'transaction error two'],
                }
              ],
              withoutKeys: [],
            };

            const component = shallowMount(FormError, {
              propsData: { errors },
            });

            expect(component.vm.errorList).toMatchObject(result);
          });
        });
      });
    });
  });

  describe('Component life cycle', () => {
    describe('#mounted', () => {
      describe('When scroll-to-self prop is true', () => {
        it('scrolls window to the component', () => {
          const component = shallowMount(FormError);

          expect(global.scrollTo).toHaveBeenCalledWith(0, component.vm.$el.offsetTop - 20);
        });
      });

      describe('When scroll-to-self is false', () => {
        it('does not scroll window to the component', () => {
          shallowMount(FormError, {
            propsData: { scrollToSelf: false },
          });

          expect(global.scrollTo).not.toHaveBeenCalled();
        });
      });
    });
  })

  describe('Render', () => {
    it('Do not show black listed keys', () => {
      const errors = {
        name: 'required',
        cpf: ['required', 'invalid'],
        base: 'an error happened',
      };

      const component = shallowMount(FormError, {
        propsData: { errors, blackList: ['base'] },
      });

      expect(component.findAll('div > ul > li').at(2).text()).toBe('an error happened');
    });
  });
});
