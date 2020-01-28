import { shallowMount } from '@vue/test-utils';
import SimpleLoader from './SimpleLoader.vue';

const mountSimpleLoader = (slot = []) => {
  return shallowMount(SimpleLoader, {
    slots: {
      default: slot,
    }
  });
}

describe('SimpleLoader component', () => {
  describe('When its empty', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = mountSimpleLoader();
    });

    it('matches the snapshot', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('When has some slot', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = mountSimpleLoader('Some text');
    });

    it('matches the snapshot', () => {
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('Computed', () => {
    describe('#hasSlotData', () => {
      describe('When has no slot', () => {
        let wrapper;

        beforeAll(() => {
          wrapper = mountSimpleLoader();
        });

        it('return "false"', () => {
          expect(wrapper.vm.hasSlotData).toBeFalsy();
        });
      });

      describe('When has slot', () => {
        let wrapper;

        beforeAll(() => {
          wrapper = mountSimpleLoader('Some text');
        });

        it('return "true"', () => {
          expect(wrapper.vm.hasSlotData).toBeTruthy();
        });
      });
    });
  });
});
