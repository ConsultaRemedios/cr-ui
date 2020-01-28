import { mount } from '@vue/test-utils';
import SearchInput from './SearchInput.vue';

describe('SearchInput component', () => {
  const mountSearchInput = (props = {}, methods) => {
    const propsData = { ...defaultProps, ...props };
    return mount(SearchInput, { propsData, methods });
  };

  const defaultProps = {
    showClearButton: true,
    placeholder: 'Buscar...',
    value: 'Some text to search',
  };

  describe('Props', () => {
    describe('#showClearButton', () => {
      it('returns an empty array when the prop is not passed to it', () => {
        const wrapper = mount(SearchInput);

        expect(wrapper.vm.showClearButton).toEqual(false);
      });
    });

    describe('#value', () => {
      it('returns an empty string when the prop is not passed to it', () => {
        const wrapper = mount(SearchInput);

        expect(wrapper.vm.value).toEqual('');
      });
    });

    describe('#placeholder', () => {
      it('returns the default placeholder when the prop is not passed to it', () => {
        const wrapper = mount(SearchInput);

        expect(wrapper.vm.placeholder).toEqual('Buscar...');
      });
    });
  });

  describe('matches the snapshot', () => {
    let wrapper;

    it('when "showClearButton" is false', () => {
      wrapper = mountSearchInput({ showClearButton: false });

      expect(wrapper.element).toMatchSnapshot();
    });

    it('when "showClearButton" is true', () => {
      wrapper = mountSearchInput({ showClearButton: true });

      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('Event listeners', () => {
    describe('when the input value changes', () => {
      let wrapper;
      let onInput;

      beforeEach(() => {
        onInput = jest.fn();
        wrapper = mountSearchInput({ value: 'another text' }, { onInput });

        expect(onInput).not.toHaveBeenCalled();

        wrapper.find('input').trigger('input');
      });

      it('calls #onInput', () => {
        expect(onInput).toHaveBeenCalledTimes(1);
      });

      it('calls #onInput passing the proper param', () => {
        expect(onInput.mock.calls[0][0].target.value).toEqual('another text');
      });
    });
  });

  describe('When passing "value" prop', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = mountSearchInput({ value: 'another text' });
    });

    it('sets "inputValue" data with the value prop', () => {
      expect(wrapper.vm.inputValue).toEqual('another text');
    });
  });

  describe('Methods', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mountSearchInput({ value: 'changed input text' });
    });

    describe('#onInput', () => {
      describe('When is called', () => {
        beforeEach(() => {
          const event = {
            target: { value: 'changed input text' }
          };

          wrapper.vm.onInput(event);
        });

        it('changes the "inputValue" according to "target.value"', () => {
          expect(wrapper.vm.inputValue).toEqual('changed input text');
        });
      });
    });

    describe('#onSearch', () => {
      describe('When is called', () => {
        it('emits "submit" event', () => {
          jest.spyOn(wrapper.vm, '$emit');

          wrapper.find('button').trigger('submit');
          let emitted = wrapper.vm.$emit.mock.calls[0];

          expect(emitted[0]).toEqual('submit');
        });

        it('the emitted was called with the proper value', () => {
          jest.spyOn(wrapper.vm, '$emit');

          wrapper.find('button').trigger('submit');
          let emitted = wrapper.vm.$emit.mock.calls[0];

          expect(emitted[1]).toMatchObject({ value: 'changed input text' });
        });
      });
    });

    describe('#onClickClearButton', () => {
      describe('When is called', () => {
        it('emits "click-clear-button" event', () => {
          jest.spyOn(wrapper.vm, '$emit');

          wrapper.find('.iconWrapper').trigger('click');
          const emitted = wrapper.vm.$emit.mock.calls[0];

          expect(emitted[0]).toEqual('click-clear-button');
        });
      });
    });
  });

  describe('Computed', () => {
    describe('#searchIcon', () => {
      it('returns search icon', () => {
        const wrapper = mountSearchInput();

        expect(wrapper.vm.searchIcon).toEqual({
          id: 'search.icon.svg',
          viewbox: '0 0 24 24',
        });
      });
    });

    describe('#cancelIcon', () => {
      it('returns cancel icon', () => {
        const wrapper = mountSearchInput();

        expect(wrapper.vm.cancelIcon).toEqual({
          id: 'cancel.icon.svg',
          viewbox: '0 0 24 24',
        });
      });
    });
  });
});
