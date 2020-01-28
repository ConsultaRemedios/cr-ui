import { mount, shallowMount } from '@vue/test-utils';
import { BaseInput } from 'cr-ui';
import snapshotDiff from 'snapshot-diff';
import Vue from 'vue';
import { fireEvent, render } from 'vue-testing-library';
import getCreditCardInfo from './../../../helpers/credit-card-info';
import CreditCardField from './CreditCardField.vue';

jest.mock('./../../../helpers/credit-card-info', () => jest.fn());

const createEvent = (value = 'abc54799886282def08503ghj') => ({ target: { value } });

describe('CreditCardField', () => {
  let html;
  let props;

  afterEach(() => {
    document.body.innerHTML = '';

    props = {
      name: 'card',
    };
  });

  describe('when it is empty', () => {
    it('matches the snapshot', () => {
      const wrapper = shallowMount(CreditCardField, { propsData: props });
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('when a card number is typed', () => {
    it('matches the snapshot', () => {
      getCreditCardInfo.mockImplementation(() => ({
        brand: 'american-express',
        formattedValue: '5479 9886 2820 8503'
      }));

      const wrapper = shallowMount(CreditCardField, { propsData: props });
      const wrapper2 = shallowMount(CreditCardField, { propsData: props });

      wrapper2.find(BaseInput).vm.$emit('change', { value: '54799886282def08503' });

      expect.assertions(1);

      return Vue.nextTick().then(() => {
        expect(snapshotDiff(wrapper.element, wrapper2.element)).toMatchSnapshot();
      })
    });
  });

  it('formats input properly', () => {
    getCreditCardInfo.mockImplementation(() => ({
      brand: 'american-express',
      formattedValue: '5479 9886 2820 8503'
    }));

    const { getByDisplayValue } = render(CreditCardField, { props });
    fireEvent.input(document.querySelector('[name="card"]'), createEvent());

    expect.assertions(1);

    return Vue.nextTick().then(() => {
      expect(document.querySelector('[name="card"]').value).toEqual('5479 9886 2820 8503');
    })
  });

  describe('brand images', () => {
    it('renders "american express" brand image', () => {
      getCreditCardInfo.mockImplementation(() => ({
        brand: 'american-express'
      }));

      render(CreditCardField, { props });
      fireEvent.input(document.querySelector('[name="card"]'), createEvent());

      return Vue.nextTick().then(() => {
        expect(document.querySelector('img').src).toEqual('http://localhost/american-express.png');
      });
    });

    it('renders "diners-club" brand image', () => {
      getCreditCardInfo.mockImplementation(() => ({
        brand: 'diners-club'
      }));

      render(CreditCardField, { props });
      fireEvent.input(document.querySelector('[name="card"]'), createEvent());

      return Vue.nextTick().then(() => {
        expect(document.querySelector('img').src).toEqual('http://localhost/diners-club.png');
      });
    });

    it('renders "discover" brand image', () => {
      getCreditCardInfo.mockImplementation(() => ({
        brand: 'discover'
      }));

      render(CreditCardField, { props });
      fireEvent.input(document.querySelector('[name="card"]'), createEvent());

      return Vue.nextTick().then(() => {
        expect(document.querySelector('img').src).toEqual('http://localhost/discover.png');
      });
    });

    it('renders "elo" brand image', () => {
      getCreditCardInfo.mockImplementation(() => ({
        brand: 'elo'
      }));

      render(CreditCardField, { props });
      fireEvent.input(document.querySelector('[name="card"]'), createEvent());

      return Vue.nextTick().then(() => {
        expect(document.querySelector('img').src).toEqual('http://localhost/elo.png');
      });
    });

    it('renders "hipercard" brand image', () => {
      getCreditCardInfo.mockImplementation(() => ({
        brand: 'hipercard'
      }));

      render(CreditCardField, { props });
      fireEvent.input(document.querySelector('[name="card"]'), createEvent());

      return Vue.nextTick().then(() => {
        expect(document.querySelector('img').src).toEqual('http://localhost/hipercard.png');
      });
    });

    it('renders "jcb" brand image', () => {
      getCreditCardInfo.mockImplementation(() => ({
        brand: 'jcb'
      }));

      render(CreditCardField, { props });
      fireEvent.input(document.querySelector('[name="card"]'), createEvent());

      return Vue.nextTick().then(() => {
        expect(document.querySelector('img').src).toEqual('http://localhost/jcb.png');
      });

    });

    it('renders "maestro" brand image', () => {
      getCreditCardInfo.mockImplementation(() => ({
        brand: 'maestro'
      }));

      render(CreditCardField, { props });
      fireEvent.input(document.querySelector('[name="card"]'), createEvent());

      return Vue.nextTick().then(() => {
        expect(document.querySelector('img').src).toEqual('http://localhost/maestro.png');
      });
    });

    it('renders "mastercard" brand image', () => {
      getCreditCardInfo.mockImplementation(() => ({
        brand: 'mastercard'
      }));

      render(CreditCardField, { props });
      fireEvent.input(document.querySelector('[name="card"]'), createEvent());

      return Vue.nextTick().then(() => {
        expect(document.querySelector('img').src).toEqual('http://localhost/mastercard.png');
      });
    });

    it('renders "visa" brand image', () => {
      getCreditCardInfo.mockImplementation(() => ({
        brand: 'visa'
      }));

      render(CreditCardField, { props });
      fireEvent.input(document.querySelector('[name="card"]'), createEvent());

      return Vue.nextTick().then(() => {
        expect(document.querySelector('img').src).toEqual('http://localhost/visa.png');
      });
    });
  });

  it('does not emit change event when the currentValue is equal to the value prop', () => {
    getCreditCardInfo.mockImplementation(() => ({
      brand: 'american-express',
      formattedValue: '5479 9886 2820 8503'
    }));

    const propsData = { ...props, value: '5479 9886 2820 8503' };

    const wrapper = mount(CreditCardField, { propsData });

    wrapper.find('input').element.value = 'abc54799886282def08503ghj';
    wrapper.find('input').trigger('input');

    wrapper.find('input').element.value = 'a54799886282def08503g';
    wrapper.find('input').trigger('input');

    wrapper.find('input').element.value = '54799886282def08503';
    wrapper.find('input').trigger('input');

    return Vue.nextTick().then(() => {
      expect(wrapper.emitted().change).toBeFalsy();
    });
  });

  it('updates input value when the value prop is changed', () => {
    const wrapper = mount(CreditCardField, { propsData: props });

    wrapper.setProps({ value: '5478' });

    expect(wrapper.find('input').element.value).toEqual('5478');
  });

  it('emits "blur" event with the proper params', () => {
    const wrapper = mount(CreditCardField, { propsData: props });
    jest.spyOn(wrapper.vm, '$emit');
    wrapper.find('input').trigger('blur');

    const emitted = wrapper.vm.$emit.mock.calls[0];

    expect(wrapper.vm.$emit).toHaveBeenCalledTimes(1);
    expect(emitted[0]).toEqual('blur');
    expect(emitted[1]).toMatchObject({ name: 'card', value: '5479 9886 2820 8503' });
    expect(emitted[1].event.target).toEqual(wrapper.find('input').element);
  });
});
