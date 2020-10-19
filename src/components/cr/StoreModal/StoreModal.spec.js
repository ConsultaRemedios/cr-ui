import { shallowMount } from '@vue/test-utils';
import { BaseButton } from 'cr-ui';
import StoreModal from './StoreModal.vue';

const shallowStoreModal = (data = {}, slot = []) => {
  return shallowMount(StoreModal, {
    propsData: { ...data },
    slots: {
      default: slot,
    }
  });
};
const informations = [{
  title: 'Panvel Farmácias',
  content: 'Dimed S/A Distribuidora de Medicamentos<br />CNPJ 92.665.611/0001-77<br />AFE: 7.17094.5 <br />CMVS - 355030801-477-002443-1-7'
}, {
  title: 'Farmacêutico responsável',
  content: 'Ely Fernandes Lima<br />CRF/PR: 15448'
}, {
  title: 'Horário de funcionamento',
  content: 'Segunda a Sexta <br />8h00 às 20h30<br />Av. Industrial Belgraf, 865 Eldorado do Sul, Rio Grande do Sul'
}, {
  title: 'Atendimento',
  content: '(51) 3481-9500<br />sac@grupodimed.com.br'
}];

describe('StoreModal component', () => {
  describe('Snapshot', () => {

    describe('When has "name", "logoPath" and "informations"', () => {
      let wrapper;

      beforeAll(() => {
        wrapper = shallowStoreModal({
          name: 'Name',
          logoPath: '/logo/path',
          informations,
        });
      });

      it('matches', () => {
        expect(wrapper.element).toMatchSnapshot();
      });
    });

    describe('When "isLoading" is "true"', () => {
      let wrapper;

      beforeAll(() => {
        wrapper = shallowStoreModal({
          isLoading: true,
        });
      });

      it('matches', () => {
        expect(wrapper.element).toMatchSnapshot();
      });
    });
  });

  describe('Behaviours', () => {
    it('emits "clickShowMoreProducts" when user clicks in button', () => {
      const wrapper = shallowStoreModal({
        name: 'Name',
        logoPath: '/logo/path',
        informations,
      });

      jest.spyOn(wrapper.vm, '$emit');

      wrapper.findComponent(BaseButton).vm.$emit('click');

      expect(wrapper.vm.$emit).toHaveBeenCalledTimes(1);
      expect(wrapper.vm.$emit).toHaveBeenCalledWith('clickShowMoreProducts');
    });
  });
});
