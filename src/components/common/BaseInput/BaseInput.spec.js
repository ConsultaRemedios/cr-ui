import { mount } from '@vue/test-utils';
import BaseInput from './BaseInput.vue';

describe('BaseInput component matches the snapshot with', () => {
  const defaultProps = {
    name: 'name',
  };
  const defaultAttrs = {
    placeholder: 'placeholder',
  };
  let propsData;

  const mountBaseInput = (props = {}, attributes = {}) => {
    const propsData = { ...defaultProps, ...props };
    const attrs = { ...defaultAttrs, ...attributes };

    return mount(BaseInput, {
      propsData,
      attrs,
    });
  };

  beforeEach(() => {
    propsData = {
      id: 'id',
      name: 'name',
      placeholder: 'placeholder',
      type: 'text',
      size: 'small',
    };
  })

  it('empty props', () => {
    const wrapper = mount(BaseInput, {
      propsData: {}
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('props string', () => {
    const wrapper = mountBaseInput();

    expect(wrapper.element).toMatchSnapshot();
  });

  it('isNumeric true', () => {
    const wrapper = mountBaseInput({}, {
      type: 'tel',
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('isLoading true', () => {
    const wrapper = mountBaseInput({ isLoading: true });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('disabled true', () => {
    const wrapper = mountBaseInput(null, { disabled: true });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('readOnly true', () => {
    const wrapper = mountBaseInput(null, { readonly: true });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('autofocus true', () => {

    const wrapper = mountBaseInput(null, {
      autofocus: 'autofocus'
    });

    expect(wrapper.find('input').attributes().autofocus).toEqual('autofocus');
    expect(wrapper.element).toMatchSnapshot();
  });

  it('matches snapshot when there is a prefix icon', () => {
    propsData.prefixIcon = {
      icon: {},
      color: '#666',
    };

    const wrapper = mount(BaseInput, {
      propsData,
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('matches snapshot when there is a suffix icon', () => {
    propsData.suffixIcon = {
      icon: {},
      color: '#666',
    };

    const wrapper = mount(BaseInput, {
      propsData,
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  describe('with one custom class', () => {
    it('adds custom class on input', () => {
      propsData.classes = ['the-custom-class'];
      const wrapper = mount(BaseInput, { propsData });

      expect(wrapper.find('input').classes()).toContain('the-custom-class')
    });
  });

  describe('with more than one custom classes', () => {
    it('adds custom classes on input', () => {
      propsData.classes = ['the-custom-class', 'is-custom', 'really'];
      const wrapper = mount(BaseInput, { propsData });

      expect(wrapper.find('input').classes()).toContain('the-custom-class');
      expect(wrapper.find('input').classes()).toContain('is-custom');
      expect(wrapper.find('input').classes()).toContain('really');
    });
  });

  describe('Behavior', () => {
    describe('When input event is emitted by input', () => {
      describe('and model prop is empty', () => {
        const wrapper = mountBaseInput({ model: 'name', name: 'user[name]' }, { value: 'John Doe' });

        it('emits change event with the proper params', () => {
          jest.spyOn(wrapper.vm, '$emit');
          wrapper.find('input').trigger('input');

          const emitted = wrapper.vm.$emit.mock.calls[0];

          expect(emitted[1]).toMatchObject({ name: 'name', value: 'John Doe' });
          expect(wrapper.vm.$emit).toHaveBeenCalledTimes(1);
          expect(emitted[0]).toEqual('change');
          expect(emitted[1].event.target).toEqual(wrapper.find('input').element);
        });
      });

      describe('and model prop is not empty', () => {
        const wrapper = mountBaseInput({  name: 'user[name]' }, { value: 'John Doe' });

        it('emits change event with the proper params', () => {
          jest.spyOn(wrapper.vm, '$emit');
          wrapper.find('input').trigger('input');

          const emitted = wrapper.vm.$emit.mock.calls[0];

          expect(emitted[0]).toEqual('change');
          expect(emitted[1]).toMatchObject({ name: 'user[name]', value: 'John Doe' });
          expect(emitted[1].event.target).toEqual(wrapper.find('input').element);
        });
      });
    });

    describe('When blur event is emitted by input', () => {
      describe('and model prop is empty', () => {
        const wrapper = mountBaseInput({ name: 'user[name]', model: 'name' }, { value: 'John Doe' });

        it('emits "blur" event with the proper params', () => {
          jest.spyOn(wrapper.vm, '$emit');
          wrapper.find('input').trigger('blur');

          const emitted = wrapper.vm.$emit.mock.calls[0];

          expect(wrapper.vm.$emit).toHaveBeenCalledTimes(1);
          expect(emitted[0]).toEqual('blur');
          expect(emitted[1]).toMatchObject({ name: 'name', value: 'John Doe' });
          expect(emitted[1].event.target).toEqual(wrapper.find('input').element);
        });
      });

      describe('and model prop is not empty', () => {
        const wrapper = mountBaseInput({ name: 'user[name]' }, { value: 'John Doe' });

        it('emits "blur" event with the proper params', () => {
          jest.spyOn(wrapper.vm, '$emit');
          wrapper.find('input').trigger('blur');

          const emitted = wrapper.vm.$emit.mock.calls[0];

          expect(emitted[0]).toEqual('blur');
          expect(emitted[1].name).toEqual('user[name]')
          expect(emitted[1].value).toEqual('John Doe')
          expect(emitted[1].event.target).toEqual(wrapper.find('input').element);
        });
      });
    });

    it('emits blur event with proper params when blur event is emitter on input', () => {
      const wrapper = mountBaseInput({ name: 'email' }, { value: 'john@doe.com' });
      jest.spyOn(wrapper.vm, '$emit');

      expect(wrapper.vm.$emit).not.toHaveBeenCalled();

      wrapper.find('input').trigger('blur');

      expect(wrapper.vm.$emit).toHaveBeenCalledTimes(1);

      const emitted = wrapper.vm.$emit.mock.calls[0];

      expect(emitted[0]).toEqual('blur');
      expect(emitted[1].name).toEqual('email');
      expect(emitted[1].value).toEqual('john@doe.com');
      expect(emitted[1].event.target).toMatchObject(wrapper.find('input').element);
    });
  });

  describe('Render', () => {
    describe('When there is id', () => {
      it('renders the snapshot', () => {
        const wrapper = mountBaseInput(null, {
          id: 'input-term'
        });

        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.find('input').attributes().id).toEqual('input-term');
      });
    });

    describe('When there is no id', () => {
      it('renders the snapshot', () => {
        const wrapper = mountBaseInput({ size: 'small' });
        expect(wrapper.element).toMatchSnapshot();
      });
    });
  });

  describe('Event Listeners', () => {
    describe('When keydown event happens', () => {
      it('calls method onKeydown', () => {
        const wrapper = mountBaseInput(null, { value: 'abc' });
        const input = wrapper.find('input');

        jest.spyOn(wrapper.vm, '$emit');

        input.trigger('keydown');
        expect(input.element.value).toBe('abc');
        expect(wrapper.vm.$emit).toHaveBeenCalled();
        expect(wrapper.vm.$emit.mock.calls[0][0]).toEqual('keydown');
        expect(wrapper.vm.$emit.mock.calls[0][1].value).toEqual('abc');
      });
    });

    describe('When changed', () => {
      let wrapper;
      let input;

      beforeAll(() => {
        wrapper = mountBaseInput();
        input = wrapper.find('input');
        jest.spyOn(wrapper.vm, '$emit');
      });

      it('calls method "onChange"', () => {
        input.trigger('input');

        expect(wrapper.vm.$emit).toHaveBeenCalled();
        expect(wrapper.vm.$emit.mock.calls[0][0]).toEqual('change');
      });
    });

    describe('When blur', () => {
      let wrapper;
      let input;

      beforeAll(() => {
        wrapper = mountBaseInput();
        input = wrapper.find('input');
        jest.spyOn(wrapper.vm, '$emit');
      });

      it('calls method "onBlur"', () => {
        input.trigger('blur');

        expect(wrapper.vm.$emit).toHaveBeenCalled();
        expect(wrapper.vm.$emit.mock.calls[0][0]).toEqual('blur');
      });
    });

    describe('When focus', () => {
      let wrapper;
      let input;

      beforeAll(() => {
        wrapper = mountBaseInput();
        input = wrapper.find('input');
        jest.spyOn(wrapper.vm, '$emit');
      });

      it('calls method "onFocus"', () => {
        input.trigger('focus');

        expect(wrapper.vm.$emit).toHaveBeenCalled();
        expect(wrapper.vm.$emit.mock.calls[0][0]).toEqual('focus');
      });
    });
  });

  describe('Methods', () => {
    const event = {
      currentTarget: {
        value: 'value',
        isTrusted: true,
      },
    };
    const formatedEvent = {
      name: 'name',
      value: 'value',
      event: {
        currentTarget: {
          value: 'value',
          isTrusted: true,
        },
      }
    };

    describe('#createEvent', () => {
      describe('When passing a event', () => {
        const wrapper = mountBaseInput(null, { name: 'name' });

        it('parses event in a new object', () => {
          expect(wrapper.vm.createEvent(event)).toEqual(formatedEvent);
        });
      });
    });

    describe('#onKeydown', () => {
      it('emits "keydown" event with proper payload', () => {
        const wrapper = mountBaseInput(null, { name: 'name' });
        jest.spyOn(wrapper.vm, '$emit');

        expect(wrapper.vm.$emit).not.toHaveBeenCalled();

        wrapper.vm.onKeydown(event)
        expect(wrapper.vm.$emit).toHaveBeenCalledTimes(1);
        expect(wrapper.vm.$emit).toHaveBeenCalledWith('keydown', formatedEvent);
      });
    });

    describe('#onChange', () => {
      describe('When called', () => {
        let wrapper;

        beforeEach(() => {
          wrapper = mountBaseInput(null, { name: 'name' });
          jest.spyOn(wrapper.vm, '$emit');
          wrapper.vm.onChange(event)
        });

        it('emits "change" event', () => {
          expect(wrapper.vm.$emit).toHaveBeenCalledWith(
            'change',
            formatedEvent
          );
        });
      });
    });

    describe('#onBlur', () => {
      describe('When called', () => {
        let wrapper;

        beforeEach(() => {
          wrapper = mountBaseInput(null, { name: 'name' });
          jest.spyOn(wrapper.vm, '$emit');
          wrapper.vm.onBlur(event)
        });

        it('emits "blur" event', () => {
          expect(wrapper.vm.$emit).toHaveBeenCalledWith(
            'blur',
            formatedEvent
          );
        });
      });
    });

    describe('#onFocus', () => {
      describe('When called', () => {
        let wrapper;

        beforeEach(() => {
          wrapper = mountBaseInput(null, { name: 'name' });
          jest.spyOn(wrapper.vm, '$emit');
          wrapper.vm.onFocus(event)
        });

        it('emits "focus" event', () => {
          expect(wrapper.vm.$emit).toHaveBeenCalledWith(
            'focus',
            formatedEvent
          );
        });
      });
    });
  });
});
