import { createLocalVue, mount } from '@vue/test-utils';
import BaseIcon from '../../common/BaseIcon';
import BaseButton from '../../common/BaseButton';
import InputGroup from '../../common/InputGroup';

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

const setup = async ({
  customProps = {},
} = {}) => {
  jest.resetModules();

  global.navigator.geolocation = true;

  const defaultProps = {
    zipcode: '11111-111',
    addresses: [addresses, addresses2],
  };

  const ZipcodeForm = require('./ZipcodeForm.vue').default;
  const wrapper = mount(ZipcodeForm, {
    localVue,
    propsData: { ...defaultProps, ...customProps },
  });

  await wrapper.vm.$nextTick();

  return {
    wrapper,
    ZipcodeForm,
    propsData: { ...defaultProps, ...customProps },
    defaultProps,
  };
};

describe('ZipcodeForm component', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe('UI state', () => {
    it('mounts component without error', async () => {
      const { wrapper } = await setup();

      expect(wrapper.text()).toContain('Informe seu CEP');
      expect(wrapper.text()).not.toContain('Não sabe seu CEP?');
      expect(wrapper.text()).not.toContain('Buscar no site dos Correios');
      expect(wrapper.findAllComponents(BaseButton).length).toBe(1);
      expect(wrapper.findComponent(BaseIcon).props('id')).toBe('find-location.icon');
      expect(wrapper.find('.buttonFindLocation').exists()).toBe(true);
      expect(wrapper.find('.fieldError').exists()).toBe(false);
      expect(wrapper.findAllComponents(InputGroup).length).toBe(2);
    });

    it('mounts component with error', async () => {
      const { wrapper } = await setup({ customProps: { hasError: true } });

      expect(wrapper.text()).toContain('Informe seu CEP');
      expect(wrapper.findAllComponents(BaseButton).length).toBe(1);
      expect(wrapper.findComponent(BaseIcon).props('id')).toBe('cancel.icon');
      expect(wrapper.find('.fieldError').exists()).toBe(true);
      expect(wrapper.findAllComponents(InputGroup).length).toBe(2);
    });

    it('mounts component with zipcode isLoaded true', async () => {
      const { wrapper } = await setup({ customProps: { isLoaded: true } });

      expect(wrapper.text()).toContain('Informe seu CEP');
      expect(wrapper.findAllComponents(BaseButton).length).toBe(3);
      expect(wrapper.findComponent(BaseIcon).props('id')).toBe('find-location.icon');
      expect(wrapper.find('.fieldError').exists()).toBe(false);
      expect(wrapper.findAllComponents(InputGroup).length).toBe(2);
    });

    it('mounts component without addresses in store', async () => {
      const { wrapper } = await setup({ customProps: { addresses: [] } });

      expect(wrapper.text()).toContain('Informe seu CEP');
      expect(wrapper.text()).toContain('Não sabe seu CEP?');
      expect(wrapper.text()).toContain('Buscar no site dos Correios');
      expect(wrapper.findAllComponents(BaseButton).length).toBe(2);
      expect(wrapper.findComponent(BaseIcon).props('id')).toBe('find-location.icon');
      expect(wrapper.find('.fieldError').exists()).toBe(false);
      expect(wrapper.findAllComponents(InputGroup).length).toBe(2);
    });
  });

  describe('Behavior', () => {
    it('clicks on use zipcode', async () => {
      const { wrapper } = await setup();
      jest.spyOn(wrapper.vm, '$emit');

      expect(wrapper.findComponent(BaseButton).text()).toBe('Usar');
      wrapper.findComponent(BaseButton).vm.$emit('click');

      await wrapper.vm.$nextTick();

      expect(wrapper.vm.$emit).toHaveBeenCalledWith('search', {
        zipcode: '11111-111',
        number: null,
        lat: null,
        lng: null,
      });
    });

    it('clicks on clear error', async () => {
      const { wrapper } = await setup({ customProps: { hasError: true } });
      jest.spyOn(wrapper.vm, '$emit');

      wrapper.find('.buttonClearZipcode').trigger('click');

      await wrapper.vm.$nextTick();

      expect(wrapper.vm.$emit).toHaveBeenCalledWith('clearZipcode');
    });

    it('clicks on save zipcode', async () => {
      const { wrapper } = await setup({ customProps: { isLoaded: true } });
      jest.spyOn(wrapper.vm, '$emit');

      expect(wrapper.findAllComponents(BaseButton).at(2).text()).toBe('Salvar e prosseguir');
      wrapper.findAllComponents(BaseButton).at(2).vm.$emit('click');

      await wrapper.vm.$nextTick();

      expect(wrapper.vm.$emit).toHaveBeenCalledWith('save', {
        zipcode: '11111-111',
        number: null,
        lat: null,
        lng: null,
      });
    });

    it('clicks on cancel zipcode', async () => {
      const { wrapper } = await setup({ customProps: { isLoaded: true } });
      jest.spyOn(wrapper.vm, '$emit');

      expect(wrapper.findAllComponents(BaseButton).at(1).text()).toBe('Cancelar');
      wrapper.findAllComponents(BaseButton).at(1).vm.$emit('click');

      await wrapper.vm.$nextTick();

      expect(wrapper.vm.$emit).toHaveBeenCalledWith('cancel');
    });

    describe('clicks on find geolocation', () => {
      it('when geolocation works', async () => {
        const { wrapper } = await setup();
        jest.spyOn(wrapper.vm, 'getGeolocation').mockImplementation(() => {});
  
        wrapper.find('.buttonFindLocation').trigger('click');
  
        await wrapper.vm.$nextTick();
  
        expect(wrapper.vm.getGeolocation).toHaveBeenCalled();
      });
  
      it("when geolocation doesn't work", async () => {
        const { wrapper } = await setup();
        global.navigator.geolocation = {
          getCurrentPosition: jest.fn( (success, error, options) => error({ message: 'error' })),
        }
  
        jest.spyOn(wrapper.vm, '$emit');
        jest.spyOn(wrapper.vm, 'getGeolocation');
  
        wrapper.find('.buttonFindLocation').trigger('click');
  
        await wrapper.vm.$nextTick();
  
        expect(wrapper.vm.getGeolocation).toHaveBeenCalledWith();
        expect(wrapper.vm.$emit).toHaveBeenCalledWith('geolocationError', {
          message: 'error',
        });
      });
    });
  });
});
