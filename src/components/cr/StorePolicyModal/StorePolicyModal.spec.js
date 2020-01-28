import { shallowMount } from '@vue/test-utils';
import StorePolicyModal from './StorePolicyModal.vue';

const defaultProps = {
  title: 'Política de Entrega',
  information: '<p>Some content</p>',
};

const shallowStorePolicyModal = (data = {}, methods = {}, computed = {}) => {
  return shallowMount(StorePolicyModal, {
    propsData: { ...defaultProps, ...data },
    methods,
    computed,
  });
};

describe('StorePolicyModal component', () => {
  beforeAll(() => {
    global.window.innerHeight = 1000;
  });

  describe('Snapshot', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallowStorePolicyModal();
    });

    it('matches when is on mobile', () => {
      const wrapper = shallowStorePolicyModal(
        {},
        {},
        { isMobileBreakpoint() { return true; } }
      );
      expect(wrapper.element).toMatchSnapshot();
    });

    it('matches when is on desktop', () => {
      const wrapper = shallowStorePolicyModal(
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
});
