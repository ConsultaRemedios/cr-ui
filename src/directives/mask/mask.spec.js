import Vue from 'vue';
import { unmask, unmaskMoney, getInput, getPattern, maskInput } from './index.js';


describe('#mask' ,() => {
  describe('#unmask', () => {
    it('return the value without special chars', () => {
      expect(unmask('(51) 99119-4823')).toBe('51991194823');
      expect(unmask('012.321.390-11')).toBe('01232139011');
      expect(unmask('12/12/2001')).toBe('12122001');
      expect(unmaskMoney('R$ 150,25')).toBe('150.25');
    });
  });

  describe('#getPattern', () => {
    it('return mask pattern based on the input value and mask value passed to it', () => {
      expect(getPattern('51991795813', 'phone')).toBe('(99) 99999-9999');
      expect(getPattern('5191795813', 'phone')).toBe('(99) 9999-9999');
      expect(getPattern('93123', 'zipcode')).toBe('99999-999');
      expect(getPattern('93123', '(999) 932.11')).toBe('(999) 932.11');
      expect(getPattern('01111990', 'date')).toBe('99/99/9999');
      expect(getPattern('15025', 'money')).toBe('money');
    });
  });

  describe('#getInput', () => {
    it('return the same element if it is an input', () => {
      const Component = Vue.component('FakeComponent', {
        render(h) {
          return h('input');
        }
      });

      const component = new Vue(Component).$mount();
      expect(getInput(component.$el)).toBe(component.$el);
    });

    it('return the children input if the element it is not an input', () => {
      const Component = Vue.component('FakeComponent', {
        render(h) {
          return h('div', [h('input')]);
        }
      });

      const component = new Vue(Component).$mount();
      expect(getInput(component.$el)).toBe(component.$el.querySelector('input'));
    });
  });

  describe('#maskInput', () => {
    it('mask an input element', () => {
      const Component = Vue.component('FakeComponent', {
        render(h) {
          return h('input', { domProps: { value: '12345678912' } });
        }
      });

      const component = new Vue(Component).$mount();

      maskInput(component.$el, 'cpf');

      component.$nextTick(() => {
        expect(component.$el.value).toBe('123.456.789-12');
      });
    });

    it('mask an input element with "money" option', () => {
      const Component = Vue.component('FakeComponent', {
        render(h) {
          return h('input', { domProps: { value: '15025' } });
        }
      });

      const component = new Vue(Component).$mount();

      maskInput(component.$el, 'money');

      component.$nextTick(() => {
        expect(component.$el.value).toBe('R$ 150,25');
      });
    });

    it('does not mask an input element with "money" option when value is empty', () => {
      const Component = Vue.component('FakeComponent', {
        render(h) {
          return h('input', { domProps: { value: '' } });
        }
      });

      const component = new Vue(Component).$mount();

      maskInput(component.$el, 'money');

      component.$nextTick(() => {
        expect(component.$el.value).toBe('');
      });
    });
  });
});
