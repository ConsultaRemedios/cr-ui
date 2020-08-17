import { shallowMount } from '@vue/test-utils';
import warning from './../../../icons/warning.icon.svg';
import BaseIcon from './../BaseIcon';
import BaseNotice from './BaseNotice';

describe('BaseNotice component', () => {
  const types = ['info', 'warning', 'success', 'danger'];

  const mountComponent = ({ icon, type}) => {
    return shallowMount(BaseNotice, {
      propsData: {
        title: 'warning title!',
        message: 'warning message',
        icon,
        type,
      }
    });
  }

  types.forEach((type) => {
    it(`matches the snapshot when type is equal to ${type}`, async () => {
      const wrapper = mountComponent({ icon: warning, type });

      await wrapper.vm.$nextTick();

      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('When there is no message', () => {
    it('matches the snapshot', async () => {
      const wrapper = shallowMount(BaseNotice, {
        propsData: {
          title: 'title for foo',
          icon: warning,
          type: 'warning',
        }
      });

      await wrapper.vm.$nextTick();

      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('When there is no icon', () => {
    it('renders info icon', () => {
      const wrapper = shallowMount(BaseNotice, {
        propsData: {
          title: 'title for foo',
          message: 'message for foo',
          type: 'warning',
        }
      });

      expect(wrapper.findComponent(BaseIcon).vm.id).toEqual('info.icon.svg');
    });
  });

  describe('When is a snackbar', async () => {
    const wrapper = shallowMount(BaseNotice, {
      propsData: {
        title: 'Você precisa corrigir os erros a baixo',
        snackbar: true,
      }
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.element).toMatchSnapshot();
  })
});
