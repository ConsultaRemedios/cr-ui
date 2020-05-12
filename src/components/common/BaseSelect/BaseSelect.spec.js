import { shallowMount } from '@vue/test-utils';
import BaseSelect from './BaseSelect.vue';

const setup = (props = {}) => {
  const options = [{
    label: 'Option 2',
    value: 1,
  }, {
    label: 'Option 1',
    value: 0,
  }];

  const wrapper = shallowMount(BaseSelect, {
    propsData: {
      value: 0,
      options,
      ...props,
    }
  });

  return { wrapper };
};

describe('BaseSelect', () => {
  describe('matches the snapshot', () => {
    let wrapper;
    beforeEach(() => {
      ({ wrapper } = setup());
    });

    it('when component is mounted', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  it('updates selected data when value prop changes', () => {
    const { wrapper } = setup();

    wrapper.setProps({ value: 1 });

    expect(wrapper.vm.selected).toEqual(1);

    wrapper.setProps({ value: 0 });

    expect(wrapper.vm.selected).toEqual(0);
  });

  describe('on create', () => {
    describe('With no placeholder', () => {
      it('does not set the first option as selected when the value is 0', () => {
        const { wrapper } = setup();
        expect(wrapper.vm.currentLabel).toEqual({
          label: 'Option 1',
          value: 0,
        });
      });

      it('sets the first option as selected when the value is ""', () => {
        const { wrapper } = setup({ value: '' });
        expect(wrapper.vm.currentLabel).toEqual({
          label: 'Option 2',
          value: 1,
        });
      });
    });
  });

  describe('computed props', () => {
    describe('#currentLabel', () => {
      it('does not set placeholder as currentLabel when selected value is 0', () => {
        const { wrapper } = setup({ placeholder: 'Selecione' });
        expect(wrapper.vm.currentLabel).toEqual({
          label: 'Option 1',
          value: 0,
        });
      });

      it('set placeholder as currentLabel when selected value is ""', () => {
        const { wrapper } = setup({ value: '', placeholder: 'Selecione' });
        expect(wrapper.vm.currentLabel).toEqual({
          label: 'Selecione'
        });
      });

      it('set currentLabel when option selet not present in options', () => {
        const { wrapper } = setup({ value: '', placeholder: 'Selecione' });
        wrapper.setData({ selected: 3 });
        expect(wrapper.vm.currentLabel).toEqual({
          label: 3,
          value: 3,
        });
      });
    });
  });
});
