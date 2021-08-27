import { mount, shallowMount } from '@vue/test-utils';
import BaseModal from '../../common/BaseModal';
import StoreBaseModal from './StoreBaseModal.vue';

const defaultProps = {
  information: '<p>Some content</p>',
};

const shallowStoreBaseModal = (data = {}, computed = {}) => {
  return shallowMount(StoreBaseModal, {
    propsData: { ...defaultProps, ...data },
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

  describe('Match UI elements', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallowStoreBaseModal();
    });

    it('matches when is on mobile', async () => {
      const wrapper = shallowStoreBaseModal(
        {},
        { isMobileBreakpoint() { return true; } }
      );

      await wrapper.vm.$nextTick();

      expect(wrapper.findComponent(BaseModal).exists()).toBe(true);
      expect(wrapper.findComponent(BaseModal).props('dismissible')).toBe(true);
      expect(wrapper.findComponent(BaseModal).props('type')).toBe('normal');
      expect(wrapper.find('.header').exists()).toBe(true);
      expect(wrapper.find('.wrapper').exists()).toBe(true);
      expect(wrapper.find('.content.showScroll').exists()).toBe(true);
    });

    it('matches when is on desktop', async () => {
      const wrapper = shallowStoreBaseModal(
        {},
        { isMobileBreakpoint() { return false; } }
      );

      await wrapper.vm.$nextTick();

      expect(wrapper.findComponent(BaseModal).exists()).toBe(true);
      expect(wrapper.findComponent(BaseModal).props('dismissible')).toBe(true);
      expect(wrapper.findComponent(BaseModal).props('type')).toBe('normal');
      expect(wrapper.find('.header').exists()).toBe(true);
      expect(wrapper.find('.wrapper').exists()).toBe(true);
      expect(wrapper.find('.content').exists()).toBe(true);
      expect(wrapper.find('.content.showScroll').exists()).toBe(false);
    });

    it('matches when is loading', async () => {
      wrapper.setProps({ isLoading: true });

      await wrapper.vm.$nextTick();

      expect(wrapper.findComponent(BaseModal).exists()).toBe(true);
      expect(wrapper.findComponent(BaseModal).props('dismissible')).toBe(true);
      expect(wrapper.findComponent(BaseModal).props('type')).toBe('normal');
      expect(wrapper.find('.header').exists()).toBe(true);
      expect(wrapper.find('.wrapper').exists()).toBe(true);
      expect(wrapper.find('.content.contentloader').exists()).toBe(true);
    });

    it('matches when is not loading', async () => {
      wrapper.setProps({ isLoading: false });

      await wrapper.vm.$nextTick();

      expect(wrapper.findComponent(BaseModal).exists()).toBe(true);
      expect(wrapper.findComponent(BaseModal).props('dismissible')).toBe(true);
      expect(wrapper.findComponent(BaseModal).props('type')).toBe('normal');
      expect(wrapper.find('.header').exists()).toBe(true);
      expect(wrapper.find('.wrapper').exists()).toBe(true);
      expect(wrapper.find('.content').exists()).toBe(true);
      expect(wrapper.find('.content.contentloader').exists()).toBe(false);
    });
  });

  describe('Lifecycle', () => {
    describe('#mounted', () => {
      const updateMaxContentHeight = jest.fn();
      let wrapper;

      beforeAll(() => {
        window.addEventListener = jest.fn();
        window.innerHeight = 100;
        wrapper = shallowStoreBaseModal();
      });

      it('calls #updateMaxContentHeight and calculate maxContentHeight', () => {
        expect(wrapper.vm.ui.maxContentHeight).toBe(20);
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
        wrapper.findComponent(BaseModal).vm.$emit('close');
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
