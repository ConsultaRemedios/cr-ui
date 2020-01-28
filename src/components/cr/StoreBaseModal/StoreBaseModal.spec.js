import { mount, shallowMount } from '@vue/test-utils';
import BaseModal from '../../common/BaseModal';
import StoreBaseModal from './StoreBaseModal.vue';

const defaultProps = {
  information: '<p>Some content</p>',
};

const shallowStoreBaseModal = (data = {}, methods = {}, computed = {}) => {
  return shallowMount(StoreBaseModal, {
    propsData: { ...defaultProps, ...data },
    methods,
    computed,
  });
};

const mountStoreBaseModal = () => {
  return mount(StoreBaseModal, {
    propsData: { ...defaultProps },
  });
};

describe('StoreBaseModal component', () => {
  beforeAll(() => {
    global.window.innerHeight = 1000;
  });

  describe('Snapshot', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallowStoreBaseModal();
    });

    it('matches when is on mobile', () => {
      const wrapper = shallowStoreBaseModal(
        {},
        {},
        { isMobileBreakpoint() { return true; } }
      );
      expect(wrapper.element).toMatchSnapshot();
    });

    it('matches when is on desktop', () => {
      const wrapper = shallowStoreBaseModal(
        {},
        {},
        { isMobileBreakpoint() { return false; } }
      );
      expect(wrapper.element).toMatchSnapshot();
    });

    it('matches when is loading', () => {
      wrapper.setProps({ isLoading: true });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('matches when is not loading', () => {
      wrapper.setProps({ isLoading: false });
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('Lifecycle', () => {
    describe('#mounted', () => {
      const updateMaxContentHeight = jest.fn();
      let wrapper;

      beforeAll(() => {
        window.addEventListener = jest.fn();
        wrapper = shallowStoreBaseModal({}, { updateMaxContentHeight });
      });

      it('calls #updateMaxContentHeight', () => {
        expect(updateMaxContentHeight).toHaveBeenCalled();
      });

      it('adds event listener "resize"', () => {
        expect(window.addEventListener).toHaveBeenCalledWith(
          'resize',
          wrapper.vm.updateMaxContentHeight,
        );
      });
    });

    describe('#destroyed', () => {
      let wrapper;

      beforeAll(() => {
        window.removeEventListener = jest.fn();
        wrapper = shallowStoreBaseModal();
        wrapper.destroy()
      });

      it('removes event listener "resize"', () => {
        expect(window.removeEventListener).toHaveBeenCalledWith(
          'resize',
          wrapper.vm.updateMaxContentHeight,
        );
      });
    });
  });

  describe('Event Listeners', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = mountStoreBaseModal();
    });

    describe('When BaseModal emits "close"', () => {
      beforeEach(() => {
        jest.spyOn(wrapper.vm, '$emit');
        wrapper.find(BaseModal).vm.$emit('close');
      });

      it('emits "close"', () => {
        expect(wrapper.vm.$emit).toHaveBeenLastCalledWith('close');
      });
    });
  });

  describe('Methods', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallowStoreBaseModal();
    });

    describe('#updateMaxContentHeight', () => {
      describe('When window.innerHeight is 500', () => {
        beforeEach(() => {
          global.window.innerHeight = 500;
          wrapper.vm.updateMaxContentHeight();
        });

        it('updates "ui.maxContentHeight" to 420', () => {
          expect(wrapper.vm.ui.maxContentHeight).toBe(420);
        });
      });
    });
  });
});
