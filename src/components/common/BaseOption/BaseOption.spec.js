import { shallowMount } from '@vue/test-utils';
import { BaseSelect } from '../BaseSelect';
import BaseOption from './BaseOption.vue';

const propsData = {
  value: 2,
};

const shallowMountBaseOption = (props = {}) => {
  return shallowMount(BaseOption, {
    propsData: {
      ...propsData,
      ...props,
    },
    slots: {
      default: `
        <span>Just span</span>
      `,
    },
    parentComponent: BaseSelect,
  });
}

describe('BaseOption component', () => {
  describe('matches the snapshot', () => {
    it('when component is mounted', () => {
      const wrapper = shallowMountBaseOption();

      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('Behaviours', () => {
    it('parent emits change when user clics on BaseOption', () => {
      const wrapper = shallowMountBaseOption()
      jest.spyOn(wrapper.vm.$parent, '$emit');

      wrapper.find('.option').trigger('click');

      expect(wrapper.vm.$parent.$emit).toHaveBeenCalledWith("change", 2)
    });

    it('parent not emits change when user clics on BaseOption and prop "emitEvent" is false', () => {
      const wrapper = shallowMountBaseOption({ emitEvent: false })
      jest.spyOn(wrapper.vm.$parent, '$emit');

      wrapper.find('.option').trigger('click');

      expect(wrapper.vm.$parent.$emit).not.toHaveBeenCalled()
    });
  });
});
