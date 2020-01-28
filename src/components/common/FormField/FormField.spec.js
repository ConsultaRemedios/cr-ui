import { shallowMount } from '@vue/test-utils';
import FormField from './FormField.vue';

const mountComponent = (props) => {
  const propsData = props ? props : {};
  return shallowMount(FormField, { propsData });
};

describe('Form Field component', () => {
  it('matches snapshot', () => {
    const wrapper = mountComponent();
    expect(wrapper.element).toMatchSnapshot();
  });

  describe('When there is label', () => {
    it('matches snapshot', () => {
      const wrapper = mountComponent({ label: 'Name' });
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('When there is error', () => {
    it('matches snapshot', () => {
      const wrapper = mountComponent({ label: 'Name', error: 'a name error' });
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
