import { mount } from '@vue/test-utils';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import snapshotDiff from 'snapshot-diff';
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
    it('does not render close button when dismissible is equal to "false"', () => {
      const wrapper = mountModal({
        propsData: { dismissible: false }
      });

      expect(wrapper.find('button[data-modal-close]').exists()).toBe(false);
    });

    it('does render close button when dismissible is equal to "true"', () => {
      const wrapper = mountModal({
        propsData: { dismissible: true }
      });

      expect(wrapper.find('button[data-modal-close]').exists()).toBe(true);
    });
  });

  describe('When mounted', () => {
    it('calls disableBodyScroll', () => {
      const wrapper = mountModal();
      expect(disableBodyScroll).toHaveBeenCalledTimes(1);
      expect(disableBodyScroll).toHaveBeenCalledWith(wrapper.vm.$el);
    })
  });

  describe('When destroyed', () => {
    it('calls disableBodyScroll', () => {
      const wrapper = mountModal();
      expect(enableBodyScroll).not.toHaveBeenCalled();

      wrapper.destroy();
      expect(enableBodyScroll).toHaveBeenCalledTimes(1);
      expect(enableBodyScroll).toHaveBeenCalledWith(wrapper.vm.$el);
    })
  });

  describe('When click on close button', () => {
    it('emits close event', () => {
      const wrapper = mountModal();
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
        it('emits close event', () => {
          wrapper.find('[data-modal-overlay]').trigger('click');
          expect(wrapper.vm.$emit).toHaveBeenCalledTimes(1);
        });
      });

      describe('and dismissible prop is "false"', () => {
        it('does not emit close event', () => {
          wrapper = mountModal({
            propsData: { dismissible: false }
          });

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
          default: ['<div>Modal content here</div>'],
        },
      });
    });

    it('matches to snapshot', () => {
      expect(wrapper.vm.$el).toMatchSnapshot();
    });

    it('matches to snapshot when props "customCssClass" is passed', () => {
      const localWrapper = mount(BaseModal, {
        slots: {
          default: ['<div>Modal content here</div>'],
        },
        propsData: { customCssClass: ['some-weird-css-class'] }
      });

      expect(snapshotDiff(wrapper.element, localWrapper.element)).toMatchSnapshot();
    });
  });
});
