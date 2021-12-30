import { shallowMount, createLocalVue } from '@vue/test-utils';
import { BaseButton, BaseModal } from 'cr-ui';
import RemovedItemsModal from './RemovedItemsModal.vue';

const makeSut = ({ customProps = {} } = {}) => {
  const localVue = createLocalVue();
  const stores = [
    {
      name: 'Loja 1',
      logo: 'http://loja.dev.local:3002/store/logos/1_7d24ba07f10c9ec009b62b31d4d0c78f005d8ed8.jpeg?1553793053',
      id: 1,
      items: [
        {
          removedQuantity: 2,
          remainingQuantity: 97,
          name: 'Mucosolvan',
          variation: '30mg/5ml, xarope, frasco com 120ml',
          image: '/image_not_requireds/large/missing.png',
        },
        {
          removedQuantity: 2,
          remainingQuantity: 0,
          name: 'Tylenol',
          variation: '750mg, caixa com 20 comprimidos revestidos',
          image: '/image_not_requireds/large/missing.png',
        },
      ],
    },
    {
      name: 'Loja 2',
      logo: 'http://loja.dev.local:3002/store/logos/1_7d24ba07f10c9ec009b62b31d4d0c78f005d8ed8.jpeg?1553793053',
      id: 2,
      items: [
        {
          removedQuantity: 2,
          remainingQuantity: 0,
          name: 'Tylenol',
          variation: '750mg, caixa com 20 comprimidos revestidos',
          image: '/image_not_requireds/large/missing.png',
        },
      ],
    },
  ];
  
  const propsData = {
    show: true,
    stores,
    ...customProps,
  };

  const wrapper = shallowMount(RemovedItemsModal, { propsData, localVue });

  return {
    wrapper,
    propsData,
    localVue,
    stores,
  }
};

describe('RemovedItemsModal', () => {
  describe('Match state UI', () => {
    it('should not display modal case show is false', async () => {
      const { wrapper } = makeSut({ customProps: { show: false }});
      await wrapper.vm.$nextTick();
      expect(wrapper.findComponent(BaseModal).exists()).toBe(false);
    });

    it('should display modal case show is true', () => {
      const { wrapper } = makeSut();
      expect(wrapper.findComponent(BaseModal).exists()).toBe(true);
      expect(wrapper.text()).toContain('Atenção!');
      expect(wrapper.text()).toContain('Alguns produtos em seu carrinho sofreram alteração:');
      expect(wrapper.text()).toContain('Continuar Comprando');
    });
  });

  describe('UI Behaviors', () => {
    describe('When clicked on "Continuar Comprando" button', () => {
      it('calls method "dismissModal"', () => {
        const { wrapper } = makeSut();
        jest.spyOn(wrapper.vm, '$emit');

        const btn = wrapper.findAllComponents(BaseButton).at(0);
        btn.vm.$emit('click');

        expect(wrapper.vm.$emit).toHaveBeenCalledWith('close');
      });
    });
  });
});
