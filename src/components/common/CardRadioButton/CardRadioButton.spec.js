import { mount } from '@vue/test-utils';
import BaseRadioButton from '../BaseRadioButton';

const setup = ({
  customProps = {},
} = {}) => {
  jest.clearAllMocks();
  jest.resetModules();

  const defaultProps = {
    name: 'address',
    value: 'home',
    title: 'My home',
    description: 'Street, Number - City - State',
    checked: false,
  };

  const CardRadioButton = require('./CardRadioButton.vue').default;
  const wrapper = mount(CardRadioButton, {
    propsData: { ...defaultProps, ...customProps },
  });

  return {
    wrapper,
    CardRadioButton,
    propsData: { ...defaultProps, ...customProps },
    defaultProps,
  };
};

describe('CardRadioButton', () => {
  describe('UI state', () => {
    it('mounts component without checked', () => {
      const { wrapper } = setup();

      expect(wrapper.find('.title').text()).toBe('My home');
      expect(wrapper.find('.description').text()).toBe('Street, Number - City - State');
      expect(wrapper.findComponent(BaseRadioButton).props().checked).toBe(false);
    });

    it('mounts component with checked', () => {
      const { wrapper } = setup({
        customProps: {
          checked: true,
        },
      });

      expect(wrapper.find('.title').text()).toBe('My home');
      expect(wrapper.find('.description').text()).toBe('Street, Number - City - State');
      expect(wrapper.findComponent(BaseRadioButton).props().checked).toBe(true);
    });

    it('mounts component with extra description', () => {
      const { wrapper } = setup({
        customProps: {
          extraDescription: 'Zipcode 12345678',
        },
      });

      expect(wrapper.find('.title').text()).toBe('My home');
      expect(wrapper.findAll('.description').at(0).text()).toBe('Street, Number - City - State');
      expect(wrapper.findAll('.description').at(1).text()).toBe('Zipcode 12345678');
      expect(wrapper.findComponent(BaseRadioButton).props().checked).toBe(false);
    });
  });

  describe('Behavior', () => {
    it('when clicks on item', async () => {
      const { wrapper } = setup();
      jest.spyOn(wrapper.vm, '$emit');

      expect(wrapper.find('.wrapper').exists()).toBe(true);
      wrapper.find('.wrapper').trigger('click');

      await wrapper.vm.$nextTick();

      expect(wrapper.vm.$emit).toHaveBeenCalledWith('click', {
        name: 'address',
        value: 'home',
      });
    });
  });
});
