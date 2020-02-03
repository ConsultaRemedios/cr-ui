import { shallowMount } from '@vue/test-utils';
import { BaseInput } from 'cr-ui';
import flushPromises from 'flush-promises';
import snapshotDiff from 'snapshot-diff';
import Autocomplete from './Autocomplete.vue';


const defaultProps = {
  refreshSuggestions: false,
  getSuggestions: () => [
    { name: 'Ibuprofeno 25mg', permalink: '/p/ibuprofeno-25' },
    { name: 'Ibuprofeno 50mg', permalink: '/p/ibruprofeno-50' },
    { name: 'Ibuprofeno 150mg', permalink: '/p/ibruprofeno-150' },
  ],
  suggestionKey: 'permalink',
  nameInput: 'searchInput',
};

const shallowAutocomplete = customProps => shallowMount(Autocomplete, {
  propsData: { ...defaultProps, ...customProps },
});

describe('Autocomplete component', () => {
  describe('matches the snapshot', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallowAutocomplete();
    });

    it('when component is mounted', () => {
      expect(wrapper.element).toMatchSnapshot();
    });

    it('when user inputs term', async () => {
      const localWrapper = shallowAutocomplete();

      localWrapper.findAll(BaseInput).at(0).vm.$emit('change', {
        value: 'ibu',
      });

      await flushPromises();

      expect(snapshotDiff(wrapper.element, localWrapper.element)).toMatchSnapshot();
    });

    it('when style props are passed', () => {
      const props = {
        listItemClass: '$style.customListItemStyle',
        inputClass: '$style.customInputClass',
        listClass: '$style.customListClass',
      };

      const localWrapper = shallowAutocomplete(props);
      localWrapper.setData({ suggestions: defaultProps.getSuggestions(), showSuggestions: true });

      expect(snapshotDiff(wrapper.element, localWrapper.element)).toMatchSnapshot();
    });

    it('when prop inputTerm is passed', () => {
      const localWrapper = shallowAutocomplete({ inputTerm: 'consulta' });
      expect(snapshotDiff(wrapper.element, localWrapper.element)).toMatchSnapshot();
    });

    it('when prop nameInput is passed', () => {
      const localWrapper = shallowAutocomplete({ inputTerm: 'cr' });
      expect(snapshotDiff(wrapper.element, localWrapper.element)).toMatchSnapshot();
    });

    it('when prop placeholderInput is passed', () => {
      const localWrapper = shallowAutocomplete({ placeholderInput: 'this is a placeholder' });
      expect(snapshotDiff(wrapper.element, localWrapper.element)).toMatchSnapshot();
    });
  });

  describe('emits events', () => {
    it('emits event "focus" when user clicks in input', () => {
      const wrapper = shallowAutocomplete();
      jest.spyOn(wrapper.vm, '$emit');

      wrapper.findAll(BaseInput).at(0).vm.$emit('focus');

      expect(wrapper.vm.$emit).toHaveBeenCalledTimes(1);
      expect(wrapper.vm.$emit).toHaveBeenCalledWith('focus');
    });

    it('emits event "escape" when user press esc', async () => {
      const wrapper = shallowAutocomplete();
      jest.spyOn(wrapper.vm, '$emit');

      wrapper.findAll(BaseInput).at(0).vm.$emit('change', {
        value: 'ibu',
      });

      await flushPromises();

      wrapper.findAll(BaseInput).at(0).vm.$emit('keydown', {
        event: { code: 'Escape' },
      });

      expect(wrapper.vm.$emit).toHaveBeenCalledTimes(1);
      expect(wrapper.vm.$emit).toHaveBeenCalledWith('escape');
    });
  });

  describe('when user inputs term and nagivate in the suggestions with the keyboard', () => {
    let wrapper;

    beforeEach(async () => {
      wrapper = shallowAutocomplete();
      jest.spyOn(wrapper.vm, '$emit');

      wrapper.findAll(BaseInput).at(0).vm.$emit('change', {
        value: 'ibu',
      });

      await flushPromises();
    });

    it('when press ArrowDown', async () => {
      const localWrapper = shallowAutocomplete();

      localWrapper.findAll(BaseInput).at(0).vm.$emit('change', {
        value: 'ibu',
      });

      await flushPromises();

      localWrapper.findAll(BaseInput).at(0).vm.$emit('keydown', {
        event: { code: 'ArrowDown' },
      });

      expect(snapshotDiff(wrapper.element, localWrapper.element)).toMatchSnapshot();
    });

    it('when press ArrowUp and there is no other element selected ', async () => {
      const localWrapper = shallowAutocomplete();

      localWrapper.findAll(BaseInput).at(0).vm.$emit('change', {
        value: 'ibu',
      });

      await flushPromises();

      localWrapper.findAll(BaseInput).at(0).vm.$emit('keydown', {
        event: { code: 'ArrowUp' },
      });

      expect(snapshotDiff(wrapper.element, localWrapper.element)).toMatchSnapshot();
    });

    it('when have an option selected and user press enter', () => {
      wrapper.findAll(BaseInput).at(0).vm.$emit('keydown', {
        event: { code: 'ArrowUp' },
      });

      wrapper.findAll(BaseInput).at(0).vm.$emit('keydown', {
        event: { code: 'Enter' },
      });

      expect(wrapper.vm.$emit).toHaveBeenCalledTimes(1);
      expect(wrapper.vm.$emit).toHaveBeenCalledWith('change', {
        highlight: '<strong>Ibu</strong>profeno 150mg', name: 'Ibuprofeno 150mg', permalink: '/p/ibruprofeno-150', selected: true,
      });
    });

    it('when dont have option selected and user press enter', () => {
      wrapper.findAll(BaseInput).at(0).vm.$emit('keydown', {
        event: { code: 'Enter' },
      });

      expect(wrapper.vm.$emit).toHaveBeenCalledTimes(1);
      expect(wrapper.vm.$emit).toHaveBeenCalledWith('submit', 'ibu');
    });

    it('when have an option selected and user press tab', () => {
      wrapper.findAll(BaseInput).at(0).vm.$emit('keydown', {
        event: { code: 'ArrowUp' },
      });

      wrapper.findAll(BaseInput).at(0).vm.$emit('keydown', {
        event: { code: 'Tab' },
      });

      expect(wrapper.vm.$emit).toHaveBeenCalledTimes(1);
      expect(wrapper.vm.$emit).toHaveBeenCalledWith('change', {
        highlight: '<strong>Ibu</strong>profeno 150mg', name: 'Ibuprofeno 150mg', permalink: '/p/ibruprofeno-150', selected: true,
      });
    });

    it('when user inputs a term and press esc', async () => {
      const localWrapper = shallowAutocomplete();

      localWrapper.findAll(BaseInput).at(0).vm.$emit('change', {
        value: 'ibu',
      });

      await flushPromises();

      localWrapper.findAll(BaseInput).at(0).vm.$emit('keydown', {
        event: { code: 'Escape' },
      });

      expect(snapshotDiff(wrapper.element, localWrapper.element)).toMatchSnapshot();
    });
  });

  describe('when templates are passed through slots', () => {
    describe('when "input" slot is passed', () => {
      let wrapper;
      beforeEach(() => {
        const scopedSlots = {
          input: `
            <template slot-scope="{ term, onChange, onFocus, onKeyDown, onClose }">
              <input
                :value="term"
                type="search"
                name="termo"
                autocomplete="off"
                placeholder="Busque por medicamento, substância ou produto..."
                @input="onChange"
                @focus="onFocus"
                @keydown="onKeyDown"
              />
            </template>
          `,
        };

        wrapper = shallowMount(Autocomplete, {
          propsData: defaultProps,
          scopedSlots,
        });

        jest.spyOn(wrapper.vm, '$emit');
      });

      it('when input in slot is focused', () => {
        wrapper.find('input').trigger('focus');

        expect(wrapper.vm.$emit).toHaveBeenCalledTimes(1);
        expect(wrapper.vm.$emit).toHaveBeenCalledWith('focus');
        expect(wrapper.element).toMatchSnapshot();
      });

      it('when input in slot is changed', async () => {
        wrapper.find('input').trigger('input', { value: 'dor' });

        await flushPromises();

        expect(wrapper.vm.showSuggestions).toEqual(true);
        expect(wrapper.element).toMatchSnapshot();
      });

      it('when input in slot is keydown', async () => {
        wrapper.find('input').trigger('input', { value: 'dor' });

        await flushPromises();

        wrapper.find('input').trigger('keydown', { event: { code: 'ArrowDown' } });

        expect(wrapper.element).toMatchSnapshot();
      });
    });

    describe('when "listItem" slot is passed', () => {
      let wrapper;
      beforeEach(async () => {
        const scopedSlots = {
          listItem: `
            <template slot-scope="{ suggestion }">
              <span v-html="suggestion.highlight"></span>
            </template>
          `,
        };

        wrapper = shallowMount(Autocomplete, {
          propsData: defaultProps,
          scopedSlots,
        });

        wrapper.findAll(BaseInput).at(0).vm.$emit('change', {
          value: 'ibu',
        });
        jest.spyOn(wrapper.vm, '$emit');

        await flushPromises();
      });

      it('when listItem is rendered', async () => {
        expect(wrapper.element).toMatchSnapshot();
      });

      describe('when user inputs term and nagivate in the suggestions with the keyboard', () => {
        it('when press ArrowDown', async () => {
          const localWrapper = shallowAutocomplete();

          localWrapper.findAll(BaseInput).at(0).vm.$emit('change', {
            value: 'ibu',
          });

          await flushPromises();

          localWrapper.findAll(BaseInput).at(0).vm.$emit('keydown', {
            event: { code: 'ArrowDown' },
          });

          expect(snapshotDiff(wrapper.element, localWrapper.element)).toMatchSnapshot();
        });

        it('when press ArrowUp and there is no other element selected ', async () => {
          const localWrapper = shallowAutocomplete();

          localWrapper.findAll(BaseInput).at(0).vm.$emit('change', {
            value: 'ibu',
          });

          await flushPromises();

          localWrapper.findAll(BaseInput).at(0).vm.$emit('keydown', {
            event: { code: 'ArrowUp' },
          });

          expect(snapshotDiff(wrapper.element, localWrapper.element)).toMatchSnapshot();
        });

        it('when have an option selected and user press enter', () => {
          wrapper.findAll(BaseInput).at(0).vm.$emit('keydown', {
            event: { code: 'ArrowUp' },
          });

          wrapper.findAll(BaseInput).at(0).vm.$emit('keydown', {
            event: { code: 'Enter' },
          });

          expect(wrapper.vm.$emit).toHaveBeenCalledTimes(1);
          expect(wrapper.vm.$emit).toHaveBeenCalledWith('change', {
            highlight: '<strong>Ibu</strong>profeno 150mg', name: 'Ibuprofeno 150mg', permalink: '/p/ibruprofeno-150', selected: true,
          });
        });

        it('when dont have option selected and user press enter', () => {
          wrapper.findAll(BaseInput).at(0).vm.$emit('keydown', {
            event: { code: 'Enter' },
          });

          expect(wrapper.vm.$emit).toHaveBeenCalledTimes(1);
          expect(wrapper.vm.$emit).toHaveBeenCalledWith('submit', 'ibu');
        });

        it('when hava an option selected and use press tab', () => {
          wrapper.findAll(BaseInput).at(0).vm.$emit('keydown', {
            event: { code: 'ArrowUp' },
          });

          wrapper.findAll(BaseInput).at(0).vm.$emit('keydown', {
            event: { code: 'Tab' },
          });

          expect(wrapper.vm.$emit).toHaveBeenCalledTimes(1);
          expect(wrapper.vm.$emit).toHaveBeenCalledWith('change', {
            highlight: '<strong>Ibu</strong>profeno 150mg', name: 'Ibuprofeno 150mg', permalink: '/p/ibruprofeno-150', selected: true,
          });
        });

        it('when user inputs term and press esc', async () => {
          const localWrapper = shallowAutocomplete();

          localWrapper.findAll(BaseInput).at(0).vm.$emit('change', {
            value: 'ibu',
          });

          await flushPromises();

          localWrapper.findAll(BaseInput).at(0).vm.$emit('keydown', {
            event: { code: 'Escape' },
          });

          expect(snapshotDiff(wrapper.element, localWrapper.element)).toMatchSnapshot();
        });
      });
    });
  });

  describe('Methods', () => {
    describe('#highlighter', () => {
      it('wraps the term inside the word passed with a <strong>', () => {
        const wrapper = shallowAutocomplete();

        expect(wrapper.vm.highlighter({ term: 'con', word: 'consulta remédios' })).toEqual('<strong>con</strong>sulta remédios');
      });
    });
  });
});
