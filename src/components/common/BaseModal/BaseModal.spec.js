import { mount } from '@vue/test-utils';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import BaseModal from './../BaseModal';

jest.mock('body-scroll-lock', () => ({
  disableBodyScroll: jest.fn(),
  enableBodyScroll: jest.fn()
}));

const mountModal = (opts) => {
  disableBodyScroll.mockClear();
  enableBodyScroll.mockClear();

  const options = opts || {};
  const defaultOptions = {
    slots: {
      default: ['Modal content here'],
    },
  };
  return mount(BaseModal, { ...defaultOptions, ...options });
}

describe('BaseModal Component', () => {
  describe('Default props value', () => {
    describe('#dismissible', () => {
      it('returns true by default', () => {
        const wrapper = mount(BaseModal);
        expect(wrapper.vm.dismissible).toBe(true);
      });
    });
  });

  describe('render', () => {
    it('does not render close button when dismissible is equal to "false"', async () => {
      const wrapper = mountModal({
        propsData: { dismissible: false }
      });

      await wrapper.vm.$nextTick();

      expect(wrapper.find('button[data-modal-close]').exists()).toBe(false);
    });

    it('does render close button when dismissible is equal to "true"', async () => {
      const wrapper = mountModal({
        propsData: { dismissible: true }
      });

      await wrapper.vm.$nextTick();
      
      expect(wrapper.find('button[data-modal-close]').exists()).toBe(true);
    });
  });

  describe('When mounted', () => {
    it('calls disableBodyScroll', async () => {
      const wrapper = mountModal();
      
      await wrapper.vm.$nextTick();

      expect(disableBodyScroll).toHaveBeenCalledTimes(1);
      expect(disableBodyScroll).toHaveBeenCalledWith(wrapper.vm.$el);
    })
  });

  describe('When destroyed', () => {
    it('calls disableBodyScroll', async () => {
      const wrapper = mountModal();
      
      await wrapper.vm.$nextTick();
      
      expect(enableBodyScroll).not.toHaveBeenCalled();

      wrapper.destroy();
      expect(enableBodyScroll).toHaveBeenCalledTimes(1);
      expect(enableBodyScroll).toHaveBeenCalledWith(wrapper.vm.$el);
    })
  });

  describe('When click on close button', () => {
    it('emits close event', async () => {
      const wrapper = mountModal();

      await wrapper.vm.$nextTick();

      jest.spyOn(wrapper.vm, '$emit');

      wrapper.find('button[data-modal-close]').trigger('click');
      expect(wrapper.vm.$emit).toHaveBeenCalledTimes(1);
    });
  });

  describe('When click on modal element', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mountModal();
      jest.spyOn(wrapper.vm, '$emit');
    });

    afterEach(() => {
      wrapper.vm.$emit.mockRestore();
    });

    describe('When the target is the overlay', () => {
      describe('and dismissible prop is "true"', () => {
        it('emits close event', async () => {
          await wrapper.vm.$nextTick();
          
          wrapper.find('[data-modal-overlay]').trigger('click');
          expect(wrapper.vm.$emit).toHaveBeenCalledTimes(1);
        });
      });

      describe('and dismissible prop is "false"', () => {
        it('does not emit close event', async () => {
          wrapper = mountModal({
            propsData: { dismissible: false }
          });

          await wrapper.vm.$nextTick();

          jest.spyOn(wrapper.vm, '$emit');

          wrapper.find('[data-modal-overlay]').trigger('click');
          expect(wrapper.vm.$emit).not.toHaveBeenCalled();
        });
      });
    });

    describe('When the target is the modal content', () => {
      it('does not emit close event', () => {
        wrapper.find('[data-modal-content]').trigger('click');
        expect(wrapper.vm.$emit).not.toHaveBeenCalled();
      });
    });
  });

  describe('When rendered', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(BaseModal, {
        slots: {
          default: ['<div class="teste">Modal content here</div>'],
        },
      });
    });

    it('matches to ui elements', () => {
      expect(wrapper.find('.overlay').exists()).toBe(true);
      expect(wrapper.find('.container').exists()).toBe(true);
      expect(wrapper.find('.content').exists()).toBe(true);
      expect(wrapper.find('.closeButtonLabel').text()).toContain('Fechar');
      expect(wrapper.find('.teste').text()).toContain('Modal content here');
    });

    it('matches to ui elements when props "customCssClass" is passed', async () => {
      const localWrapper = mount(BaseModal, {
        slots: {
          default: ['<div class="teste">Modal content here</div>'],
        },
        propsData: { customCssClass: ['some-weird-css-class'] }
      });
      
      await wrapper.vm.$nextTick();

      expect(localWrapper.find('.overlay.some-weird-css-class').exists()).toBe(true);
      expect(localWrapper.find('.container').exists()).toBe(true);
      expect(localWrapper.find('.content').exists()).toBe(true);
      expect(localWrapper.find('.closeButtonLabel').text()).toContain('Fechar');
      expect(localWrapper.find('.teste').text()).toContain('Modal content here');
    });
  });
});
