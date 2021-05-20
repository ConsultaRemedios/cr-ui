import { mount } from '@vue/test-utils';
import SimpleSelect from './SimpleSelect.vue';

const getSelected = wrapper => wrapper
  .findAll('option').wrappers
  .find(w => w.element.selected)
  .element;

describe('SimpleSelect component', () => {
  let propsData;

  beforeEach(() => {
    propsData = {
      name: 'gender',
      selected: 'F',
      placeholder: 'Selecione',
      options: [
        { label: 'Feminino', value: 'F' },
        { label: 'Masculino', value: 'M' },
      ],
    };
  });

  describe('Props', () => {
    describe('#options', () => {
      it('returns an empty array when the prop is not passed to it', () => {
        const wrapper = mount(SimpleSelect);
        expect(wrapper.vm.options).toEqual([]);
      });
    });

    describe('#selected', () => {
      it('returns an empty string when the prop is not passed to it', () => {
        const wrapper = mount(SimpleSelect);
        expect(wrapper.vm.selected).toEqual('');
      });

      it('changes selected option when prop "selected" is changed', async () => {
        const wrapper = mount(SimpleSelect, { propsData });
        const option = getSelected(wrapper);

        expect(option.value).toEqual('F');

        await wrapper.setProps({ selected: 'M' });

        expect(getSelected(wrapper).value).toEqual('M');
      })
    });

    describe('#placeholder', () => {
      it('returns "Selecione" when the prop is not passed to it', () => {
        const wrapper = mount(SimpleSelect);
        expect(wrapper.vm.placeholder).toEqual('Selecione');
      });
    });
  });

  it('matches the snapshot', () => {
    const wrapper = mount(SimpleSelect, { propsData });
    expect(wrapper.element).toMatchSnapshot();
  });

  describe('Template contracts', () => {
    it('selects the placeholder option when selected prop is empty', () => {
      propsData.selected = '';

      const wrapper = mount(SimpleSelect, { propsData });
      const option = getSelected(wrapper);

      expect(option.value).toEqual('Selecione');
    });

    it('selects the proper option when selected prop is not empty', () => {
      const wrapper = mount(SimpleSelect, { propsData });
      const option = getSelected(wrapper);

      expect(option.value).toEqual('F');
    });

    it('selects the proper option when selected prop is changed', async () => {
      const wrapper = mount(SimpleSelect, { propsData });

      wrapper.find('option[value="M"]').trigger('change');
      await wrapper.vm.$nextTick();

      const option = getSelected(wrapper);

      expect(option.value).toEqual('M');
    });
  });

  describe('Event listeners', () => {
    it('emits #onChange when select is changed', () => {
      const wrapper = mount(SimpleSelect, { propsData });

      jest.spyOn(wrapper.vm, '$emit');

      expect(wrapper.vm.$emit).not.toHaveBeenCalled();

      wrapper.find('option[value="M"]').trigger('change');

      expect(wrapper.vm.$emit).toHaveBeenCalledTimes(1);
      expect(wrapper.vm.$emit.mock.calls[0][1]).toEqual({name: "gender", value: "M"});
    });
  });

  describe('Initial data', () => {
    it('sets value data to equal the selected prop', () => {
      const wrapper = mount(SimpleSelect, { propsData });
      expect(wrapper.vm.value).toEqual('F');
    });
  });

  describe('Methods', () => {
    describe('#onChange', () => {
      const event = { target: { value: 'M' } };

      it('updates value', () => {
        const wrapper = mount(SimpleSelect, { propsData });

        wrapper.vm.onChange(event);

        expect(wrapper.vm.value).toEqual('M');
      });

      it('emits "change" event with proper params when it has model and name props', () => {
        propsData.model = 'gender-model';

        const wrapper = mount(SimpleSelect, { propsData });

        jest.spyOn(wrapper.vm, '$emit');

        wrapper.vm.onChange(event);

        expect(wrapper.vm.$emit).toHaveBeenCalledWith('change', {
          name: 'gender-model', value: 'M'
        });
      });

      it('emits "change" event with proper params when it has no model, but it has name prop', () => {
        const wrapper = mount(SimpleSelect, { propsData });

        jest.spyOn(wrapper.vm, '$emit');

        wrapper.vm.onChange(event);

        expect(wrapper.vm.$emit).toHaveBeenCalledWith('change', {
          name: 'gender', value: 'M'
        });
      });

      it('emits "change" event with proper params when it has no model and name props neither', () => {
        propsData.name = undefined;

        const wrapper = mount(SimpleSelect, { propsData });

        jest.spyOn(wrapper.vm, '$emit');

        wrapper.vm.onChange(event);

        expect(wrapper.vm.$emit).toHaveBeenCalledWith('change', {
          name: '', value: 'M'
        });
      });
    });
  });

  describe('Computed', () => {
    describe('#label', () => {
      it('returns the label of the selected option if there is one', () => {
        const wrapper = mount(SimpleSelect, { propsData });
        expect(wrapper.vm.label).toEqual('Feminino');
      });

      it('returns placeholder value if there is no selected option', () => {
        propsData.selected = undefined;

        const wrapper = mount(SimpleSelect, { propsData });
        expect(wrapper.vm.label).toEqual('Selecione');
      });
    });

    describe('#icon', () => {
      it('returns arrow icon', () => {
        const wrapper = mount(SimpleSelect, { propsData });

        expect(wrapper.vm.icon).toEqual({
          id: 'drop.icon.svg',
          viewbox: '0 0 24 24',
        });
      });
    });
  });
});
