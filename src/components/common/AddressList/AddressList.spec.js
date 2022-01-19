import { createLocalVue, mount } from '@vue/test-utils';
import BaseRadioButton from '../BaseRadioButton';

const localVue = createLocalVue();

const addresses = {
  id: 1,
  number: '10',
  zipcode: '11111111',
  name: 'Teste',
  street: 'Rua teste',
  neighborhood: 'Bairro Teste',
  city: 'Teste',
  state: 'TE',
};

const addresses2 = {
  id: 2,
  number: '10',
  zipcode: '22222222',
  name: 'Teste',
  street: 'Rua teste',
  neighborhood: 'Bairro Teste',
  city: 'Teste',
  state: 'TE',
};

const addresses3 = {
  id: 2,
  number: '10',
  zipcode: '33333333',
  name: 'Teste',
  street: 'Rua teste',
  neighborhood: 'Bairro Teste',
  city: 'Teste',
  state: 'TE',
  firstName: 'João',
  lastName: 'Silva',
  phone: '(99) 99999-9999',
};

const setup = async ({
  customProps = {},
} = {}) => {
  jest.resetModules();

  const defaultProps = {
    userLogged: true,
    isMobile: false,
    zipcode: {
      addressId: 2,
    },
    addresses: [addresses, addresses2],
  };

  const AddressList = require('./AddressList.vue').default;
  const wrapper = mount(AddressList, {
    localVue,
    propsData: { ...defaultProps, ...customProps },
  });

  await wrapper.vm.$nextTick();

  return {
    wrapper,
    AddressList,
    propsData: { ...defaultProps, ...customProps },
    defaultProps,
  };
};

describe('AddressList component', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe('UI state', () => {
    it('mounts component without user logged', async () => {
      const { wrapper } = await setup({
        customProps: {
          userLogged: false,
        },
      });

      expect(wrapper.text()).toBe('');
    });

    it('mounts component without addresses', async () => {
      const { wrapper } = await setup({
        customProps: {
          addresses: [],
        },
      });

      expect(wrapper.text()).toBe('');
    });

    describe("when the address has the recipient's name", () => {
      it('should show the information', async () => {
        const { wrapper } = await setup({
          customProps: {
            addresses: [addresses3],
          },
        });

        expect(wrapper.text()).toContain('João Silva - (99) 99999-9999');
      });
    });

    describe('Desktop', () => {
      it('mounts component with default state', async () => {
        const { wrapper } = await setup();

        expect(wrapper.text()).toContain('Em um dos seus endereços:');
        expect(wrapper.text()).toContain('Editar endereço');
        expect(wrapper.text()).toContain('Em outro endereço');

        expect(wrapper.findComponent(BaseRadioButton).exists()).toBe(true);
        expect(wrapper.findAllComponents(BaseRadioButton).length).toBe(2);
        expect(wrapper.findAllComponents(BaseRadioButton).at(1).props('value')).toBe('22222222');
        expect(wrapper.findAllComponents(BaseRadioButton).at(1).props('name')).toBe('Teste');
        expect(wrapper.findAllComponents(BaseRadioButton).at(1).props('checked')).toBe(true);
      });
    });

    describe('Mobile', () => {
      it('mounts component with default state', async () => {
        const { wrapper } = await setup({
          customProps: {
            isMobile: true,
          },
        });

        expect(wrapper.text()).toContain('Em um dos seus endereços:');
        expect(wrapper.text()).toContain('Editar endereço');
        expect(wrapper.text()).not.toContain('Em outro endereços');

        expect(wrapper.findComponent(BaseRadioButton).exists()).toBe(true);
        expect(wrapper.findAllComponents(BaseRadioButton).length).toBe(2);
        expect(wrapper.findAllComponents(BaseRadioButton).at(1).props('value')).toBe('22222222');
        expect(wrapper.findAllComponents(BaseRadioButton).at(1).props('name')).toBe('Teste');
        expect(wrapper.findAllComponents(BaseRadioButton).at(1).props('checked')).toBe(true);
      });
    });
  });

  describe('Behavior', () => {
    it('clicks on addrress item in list', async () => {
      const { wrapper } = await setup();
      jest.spyOn(wrapper.vm, '$emit');
      jest.spyOn(wrapper.vm, 'addressIsChecked');

      expect(wrapper.find('.addressWrapper').exists()).toBe(true);
      wrapper.find('.addressWrapper').trigger('click');

      await wrapper.vm.$nextTick();

      expect(wrapper.vm.addressIsChecked).toHaveBeenCalled();
      expect(wrapper.vm.$emit).toHaveBeenCalledWith('set-address', {addressId: 1, zipcode: '11111111'});
    });
  });
});
