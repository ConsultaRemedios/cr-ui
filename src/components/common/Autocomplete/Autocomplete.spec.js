import { mount, shallowMount } from '@vue/test-utils';
import { BaseInput } from 'cr-ui';
import flushPromises from 'flush-promises';
import snapshotDiff from 'snapshot-diff';
import Vue from 'vue';
import Autocomplete from './Autocomplete.vue';

const defaultProps = {
  cacheKey: 'consulta',
  getSuggestions: () => [
    { name: 'Ibuprofeno 25mg', permalink: '/p/ibuprofeno-25' },
    { name: 'Ibuprofeno 50mg', permalink: '/p/ibruprofeno-50' },
    { name: 'Ibuprofeno 150mg', permalink: '/p/ibruprofeno-150' },
  ],
  suggestionKey: 'permalink',
  inputName: 'searchInput',
  suggestionKey: 'name',
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

      localWrapper.find(BaseInput).vm.$emit('change', {
        value: 'ibu',
      });

      await flushPromises();

      expect(snapshotDiff(wrapper.element, localWrapper.element)).toMatchSnapshot();
    });

    it('when prop expanded is changed to false', async () => {
      wrapper.find(BaseInput).vm.$emit('change', {
        value: 'ibu',
      });
      await flushPromises();

      const localWrapper = shallowAutocomplete();

      localWrapper.find(BaseInput).vm.$emit('change', {
        value: 'ibu',
      });
      await flushPromises();

      localWrapper.setData({ expanded: false });

      expect(snapshotDiff(wrapper.element, localWrapper.element)).toMatchSnapshot();
    });

    it('when prop term is passed', () => {
      const localWrapper = shallowAutocomplete({ value: 'consulta' });
      expect(snapshotDiff(wrapper.element, localWrapper.element)).toMatchSnapshot();
    });

    it('when prop inputName is passed', () => {
      const localWrapper = shallowAutocomplete({ inputName: 'cr' });
      expect(snapshotDiff(wrapper.element, localWrapper.element)).toMatchSnapshot();
    });

    it('when prop placeholder is passed', () => {
      const localWrapper = shallowAutocomplete({ placeholder: 'this is a placeholder' });
      expect(snapshotDiff(wrapper.element, localWrapper.element)).toMatchSnapshot();
    });

    it('when prop suggestionKey is passed', async () => {
      const suggestions = () => [
        { title: 'Consulta', permalink: '/p/ibuprofeno-25' },
        { title: 'Minuto', permalink: '/p/ibruprofeno-50' },
        { title: 'Bleeza', permalink: '/p/ibruprofeno-150' },
      ]

      const localWrapper = shallowAutocomplete({ suggestionKey: 'title', getSuggestions: suggestions });

      wrapper.find(BaseInput).vm.$emit('change', {
        value: 'ibu',
      });

      await flushPromises();

      localWrapper.find(BaseInput).vm.$emit('change', {
        value: 'Con',
      });

      localWrapper.setData({ suggestions: suggestions });

      await flushPromises();

      expect(snapshotDiff(wrapper.element, localWrapper.element)).toMatchSnapshot();
    });


    describe('#styles', () => {
      let wrapper;
      beforeEach(() => {
        wrapper = shallowAutocomplete();
        wrapper.setData({ suggestions: defaultProps.getSuggestions(), showSuggestions: true, expanded: true, value: 'dor' });
      });

      it('when listItemClass is passed', () => {
        const localWrapper = shallowAutocomplete({ listItemClass: '$style.customListItemSyle' });
        localWrapper.setData({ suggestions: defaultProps.getSuggestions(), showSuggestions: true, expanded: true, value: 'dor' });

        expect(snapshotDiff(wrapper.element, localWrapper.element)).toMatchSnapshot();
      });

      it('when inputClass is passed', () => {
        const localWrapper = shallowAutocomplete({ inputClass: '$style.customInputClass' });
        localWrapper.setData({ suggestions: defaultProps.getSuggestions(), showSuggestions: true, expanded: true, value: 'dor' });

        expect(snapshotDiff(wrapper.element, localWrapper.element)).toMatchSnapshot();
      });

      it('when listClass is passed', () => {
        const localWrapper = shallowAutocomplete({ listClass: '$style.customListClass' });
        localWrapper.setData({ suggestions: defaultProps.getSuggestions(), showSuggestions: true, expanded: true, value: 'dor' });

        expect(snapshotDiff(wrapper.element, localWrapper.element)).toMatchSnapshot();
      });

      it('when expandedClass is passed', () => {
        const localWrapper = shallowAutocomplete({ expandedClass: '$style.customExpandedClass' });
        localWrapper.setData({ suggestions: defaultProps.getSuggestions(), showSuggestions: true, expanded: true, value: 'dor' });

        expect(snapshotDiff(wrapper.element, localWrapper.element)).toMatchSnapshot();
      });
    })
  });

  describe('#events', () => {
    it('emits event "focus" when user clicks in input', () => {
      const wrapper = shallowAutocomplete();
      jest.spyOn(wrapper.vm, '$emit');

      wrapper.find(BaseInput).vm.$emit('focus');

      expect(wrapper.vm.$emit).toHaveBeenCalledTimes(2);
      expect(wrapper.vm.$emit).toHaveBeenCalledWith('focus');
    });

    it('emits event "escape" when user press esc', async () => {
      const wrapper = shallowAutocomplete();
      jest.spyOn(wrapper.vm, '$emit');

      wrapper.find(BaseInput).vm.$emit('change', {
        value: 'ibu',
      });

      await flushPromises();

      wrapper.find(BaseInput).vm.$emit('keydown', {
        event: { code: 'Escape' },
      });

      expect(wrapper.vm.$emit).toHaveBeenCalledTimes(2);
      expect(wrapper.vm.$emit).toHaveBeenCalledWith('escape');
    });


    it('emits event "close" when suggestions is opened', async () => {
      const wrapper = shallowAutocomplete();
      jest.spyOn(wrapper.vm, '$emit');

      wrapper.find(BaseInput).vm.$emit('change', {
        value: 'ibu',
      });

      await flushPromises();

      wrapper.find(Autocomplete).vm.$emit('close');

      expect(wrapper.vm.$emit).toHaveBeenCalledTimes(2);
      expect(wrapper.vm.$emit).toHaveBeenCalledWith('close');
    });

    it('does not emit the event when the suggestions are closed ', () => {
      const ParentComponent = Vue.component('ParentComponent', {
        components: { Autocomplete },
        template: `
          <div>
            <div id="outside">Outside Here</div>
            <Autocomplete :getSuggestions="${defaultProps.getSuggestions}"/>
          </div>
        `,
      });

      const parentMount = mount(ParentComponent, { attachToDocument: true });
      const autocomplemete = parentMount.find(Autocomplete);

      jest.spyOn(autocomplemete.vm, '$emit');
      parentMount.find('#outside').trigger('click');

      expect(autocomplemete.vm.$emit).not.toHaveBeenCalled();
    });

    it('emits event "change" when users clicks in item of suggestions', async () => {
      const scopedSlots = {
        listItem: `
          <template slot-scope="{ suggestion, onClick }">
            <span @click="onClick(suggestion) "v-html="suggestion.highlight"></span>
          </template>
        `,
      }

      const wrapper = shallowMount(Autocomplete, {
        propsData: defaultProps,
        scopedSlots,
      });

      wrapper.find(BaseInput).vm.$emit('change', {
        value: 'ibu',
      });

      jest.spyOn(wrapper.vm, '$emit');

      await flushPromises();

      wrapper.findAll('span').at(1).trigger('click')


      expect(wrapper.element).toMatchSnapshot()
      expect(wrapper.vm.$emit).toHaveBeenCalledTimes(1);
      expect(wrapper.vm.$emit).toHaveBeenCalledWith('change', {
        highlight: '<strong>Ibu</strong>profeno 50mg', name: 'Ibuprofeno 50mg', permalink: '/p/ibruprofeno-50', selected: false,
      });
    });

    it('emits event "inputChanged" when users when users search for term', () => {
      const wrapper = shallowAutocomplete();
      jest.spyOn(wrapper.vm, '$emit');

      wrapper.find(BaseInput).vm.$emit('change', {
        value: 'ibu',
      });

      expect(wrapper.vm.$emit).toHaveBeenCalledTimes(1);
      expect(wrapper.vm.$emit).toHaveBeenCalledWith("inputChanged", "ibu");
    });
  });

  describe('when user inputs term and nagivate in the suggestions with the keyboard', () => {
    let wrapper;

    beforeEach(async () => {
      wrapper = shallowAutocomplete();
      jest.spyOn(wrapper.vm, '$emit');

      wrapper.find(BaseInput).vm.$emit('change', {
        value: 'ibu',
      });

      await flushPromises();
    });

    it('when press ArrowDown', async () => {
      const localWrapper = shallowAutocomplete();

      localWrapper.find(BaseInput).vm.$emit('change', {
        value: 'ibu',
      });

      await flushPromises();

      localWrapper.find(BaseInput).vm.$emit('keydown', {
        event: { code: 'ArrowDown' },
      });

      expect(snapshotDiff(wrapper.element, localWrapper.element)).toMatchSnapshot();
    });

    it('when press ArrowUp and there is no other element selected ', async () => {
      const localWrapper = shallowAutocomplete();

      localWrapper.find(BaseInput).vm.$emit('change', {
        value: 'ibu',
      });

      await flushPromises();

      localWrapper.find(BaseInput).vm.$emit('keydown', {
        event: { code: 'ArrowUp' },
      });

      expect(snapshotDiff(wrapper.element, localWrapper.element)).toMatchSnapshot();
    });

    it('when have an option selected and user press enter', () => {
      const preventDefault = jest.fn();

      wrapper.find(BaseInput).vm.$emit('keydown', {
        event: { code: 'ArrowUp', preventDefault },
      });

      wrapper.find(BaseInput).vm.$emit('keydown', {
        event: { code: 'Enter', preventDefault },
      });

      expect(wrapper.vm.$emit).toHaveBeenCalledTimes(2);
      expect(wrapper.vm.$emit).toHaveBeenCalledWith('change', {
        suggestion: {
          highlight: '<strong>Ibu</strong>profeno 150mg',
          name: 'Ibuprofeno 150mg',
          permalink: '/p/ibruprofeno-150',
          selected: true
        },
        event: {
          code: 'Enter',
          preventDefault
        }
      });
    });

    it('when dont have option selected and user press enter', () => {
      wrapper.find(BaseInput).vm.$emit('keydown', {
        event: { code: 'Enter' },
      });

      expect(wrapper.vm.$emit).toHaveBeenCalledTimes(2);
      expect(wrapper.vm.$emit).toHaveBeenCalledWith('submit', 'ibu');
    });

    it('when have an option selected and user press tab', () => {
      const preventDefault = jest.fn()

      wrapper.find(BaseInput).vm.$emit('keydown', {
        event: { code: 'ArrowUp', preventDefault },
      });

      wrapper.find(BaseInput).vm.$emit('keydown', {
        event: { code: 'Tab', preventDefault },
      });

      expect(wrapper.vm.$emit).toHaveBeenCalledTimes(2);
      expect(wrapper.vm.$emit).toHaveBeenCalledWith('change', {
        suggestion: {
          highlight: '<strong>Ibu</strong>profeno 150mg',
          name: 'Ibuprofeno 150mg',
          permalink: '/p/ibruprofeno-150',
          selected: true
        },
        event: {
          code: 'Tab',
          preventDefault
        }
      });
    });

    it('when user inputs a term and press esc', async () => {
      const localWrapper = shallowAutocomplete();

      localWrapper.find(BaseInput).vm.$emit('change', {
        value: 'ibu', preventDefault: jest.fn()
      });

      await flushPromises();

      localWrapper.find(BaseInput).vm.$emit('keydown', {
        event: { code: 'Escape', preventDefault: jest.fn() },
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

        expect(wrapper.vm.$emit).toHaveBeenCalledTimes(2);
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

        wrapper.find(BaseInput).vm.$emit('change', {
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

          localWrapper.find(BaseInput).vm.$emit('change', {
            value: 'ibu',
          });

          await flushPromises();

          localWrapper.find(BaseInput).vm.$emit('keydown', {
            event: { code: 'ArrowDown' },
          });

          expect(snapshotDiff(wrapper.element, localWrapper.element)).toMatchSnapshot();
        });

        it('when press ArrowUp and there is no other element selected ', async () => {
          const localWrapper = shallowAutocomplete();

          localWrapper.find(BaseInput).vm.$emit('change', {
            value: 'ibu',
          });

          await flushPromises();

          localWrapper.findAll(BaseInput).at(0).vm.$emit('keydown', {
            event: { code: 'ArrowUp' },
          });

          expect(snapshotDiff(wrapper.element, localWrapper.element)).toMatchSnapshot();
        });

        it('when have an option selected and user press enter', () => {
          const preventDefault = jest.fn();

          wrapper.findAll(BaseInput).at(0).vm.$emit('keydown', {
            event: { code: 'ArrowUp', preventDefault },
          });

          wrapper.findAll(BaseInput).at(0).vm.$emit('keydown', {
            event: { code: 'Enter', preventDefault },
          });

          expect(wrapper.vm.$emit).toHaveBeenCalledTimes(1);
          expect(wrapper.vm.$emit).toHaveBeenCalledWith('change', {
            suggestion: {
              highlight: '<strong>Ibu</strong>profeno 150mg',
              name: 'Ibuprofeno 150mg',
              permalink: '/p/ibruprofeno-150',
              selected: true
            },
            event: {
              code: 'Enter',
              preventDefault
            }
          });
        });

        it('when dont have option selected and user press enter', () => {
          wrapper.findAll(BaseInput).at(0).vm.$emit('keydown', {
            event: { code: 'Enter' },
          });

          expect(wrapper.vm.$emit).toHaveBeenCalledTimes(1);
          expect(wrapper.vm.$emit).toHaveBeenCalledWith('submit', 'ibu');
        });

        it('when have an option selected and use press tab', () => {
          const preventDefault = jest.fn()

          wrapper.findAll(BaseInput).at(0).vm.$emit('keydown', {
            event: { code: 'ArrowUp', preventDefault },
          });

          wrapper.findAll(BaseInput).at(0).vm.$emit('keydown', {
            event: { code: 'Tab', preventDefault },
          });

          expect(wrapper.vm.$emit).toHaveBeenCalledTimes(1);
          expect(wrapper.vm.$emit).toHaveBeenCalledWith('change', {
            suggestion: {
              highlight: '<strong>Ibu</strong>profeno 150mg',
              name: 'Ibuprofeno 150mg',
              permalink: '/p/ibruprofeno-150',
              selected: true
            },
            event: {
              code: 'Tab',
              preventDefault
            }
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

    describe('when "placeholderSuggestion" slot is passed', () => {
      it('render "placeholderSuggestion" while searching for the term', async () => {
        const scopedSlots = {
          placeholderSuggestion: `
            <template slot-scope="{ suggestion }">
              <span>Buscando</span>
            </template>
          `,
        };

        const wrapper = shallowMount(Autocomplete, {
          propsData: defaultProps,
          scopedSlots,
        });

        wrapper.find(BaseInput).vm.$emit('change', {
          value: 'ibu',
        });

        expect(wrapper.element).toMatchSnapshot();
      });
    });

    describe('when "footerListSuggestions" slot is passed', () => {
      it('render "footerListSuggestions" while searching for the term', async () => {
        const scopedSlots = {
          footerListSuggestions: `
            <template slot-scope="{ suggestion }">
              <span>Footer da lista</span>
            </template>
          `,
        };

        const wrapper = shallowMount(Autocomplete, {
          propsData: defaultProps,
          scopedSlots,
        });

        wrapper.find(BaseInput).vm.$emit('change', {
          value: 'ibu',
        });

        await flushPromises();

        expect(wrapper.element).toMatchSnapshot();
      });
    });
  });

  describe('Methods', () => {
    describe('#highlighter', () => {
      it('wraps the term inside the word passed with a <strong>', () => {
        const wrapper = shallowAutocomplete();

        expect(wrapper.vm.highlighter({ term: 'con', word: 'consulta remédios' })).toEqual('<strong>con</strong>sulta remédios');
      });

      it('escapes the typed term', () => {
        const wrapper = shallowAutocomplete();

        expect(wrapper.vm.highlighter({ term: 'Viagra (', word: 'Viagra (20mg)' })).toEqual('<strong>Viagra (</strong>20mg)');
      });
    });
  });
});
