import { shallowMount } from '@vue/test-utils';
import snapshotDiff from 'snapshot-diff';
import { BaseSelect } from '../BaseSelect';
import BaseOption from './BaseOption.vue';

const propsData = {
  value: 2,
};

const shallowMountBaseOption = (props = {}, customComputed = {}) => {
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
    computed: {
      ...customComputed
    }
  });
}

describe('BaseOption component', () => {
  describe('matches the snapshot', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallowMountBaseOption();
    });

    it('when component is mounted', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('adds class "cr-base-option__hover" when prop isHover is true', () => {
      const customComputed = {
        isHover: () => true
      }
      const localWrapper = shallowMountBaseOption({}, customComputed);

      expect(snapshotDiff(wrapper.element, localWrapper.element)).toMatchSnapshot();
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
