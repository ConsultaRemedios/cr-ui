import { mount } from '@vue/test-utils';

import BaseCheckbox from './BaseCheckbox.vue';

describe('BaseCheckbox Component', () => {
  const defaultProps = {
    name: 'newsletter',
    value: 'on',
  };

  const mountBaseCheckbox = (props = {}, attributes = {} ) => {
    const propsData = { ...defaultProps, ...props };
    const attrs = { ...attributes };
    return mount(BaseCheckbox, { propsData, attrs });
  };

  describe('Defaults', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mountBaseCheckbox();
    });

    it('assigns checked prop as false', () => {
      expect(wrapper.vm.checked).toBe(false);
    });
  });

  describe('Behavior', () => {
    describe('When it is checked and a click happens', () => {
      describe('and model prop is empty', () => {
        it('emmits "change" event with the proper params', () => {
          const wrapper = mountBaseCheckbox({ checked: true });
          wrapper.find('input').trigger('change');
          const event = wrapper.emitted().change[0][0];
          expect(event).toMatchObject({ name: 'newsletter', value: '' });
        });
      });

      describe('and model prop is not empty', () => {
        it('emmits "change" event with the proper params', () => {
          const wrapper = mountBaseCheckbox({ checked: true, model: 'customModel' });
          wrapper.find('input').trigger('change');

          const event = wrapper.emitted().change[0][0];

          expect(event).toMatchObject({ name: 'customModel', value: '' });
        });
      });
    });

    describe('When it is not checked and a click happens', () => {
      describe('and model prop is empty', () => {
        it('emmits "change" event with the proper params', () => {
          const wrapper = mountBaseCheckbox({ checked: false });
          wrapper.find('input').trigger('change');
          const event = wrapper.emitted().change[0][0];

          expect(event).toMatchObject({ name: 'newsletter', value: 'on' });
        });
      });

      describe('and model prop is not empty', () => {
        it('emmits "change" event with the proper params', () => {
          const wrapper = mountBaseCheckbox({ checked: false, model: 'customModel' });
          wrapper.find('input').trigger('change');
          const event = wrapper.emitted().change[0][0];

          expect(event).toMatchObject({ name: 'customModel', value: 'on' });
        });
      });
    });

    describe('When it is disabled and a click happens', () => {
      it('it does not call onChange method', () => {
        const wrapper = mountBaseCheckbox({ disabled: true });
        wrapper.setMethods({ onChange: jest.fn() });
        wrapper.find('input').trigger('click');
        expect(wrapper.vm.onChange).not.toBeCalled();
      });
    });
  });

  describe('Render', () => {
    describe('When it is disabled', () => {
      it('matches the snapshot', () => {
        const wrapper = mountBaseCheckbox({ disabled: true});
        expect(wrapper.element).toMatchSnapshot();
      });
    });
    describe('When it is not checked', () => {
      it('matches the snapshot', () => {
        const wrapper = mountBaseCheckbox({ checked: true });
        expect(wrapper.element).toMatchSnapshot();
      })
    });

    describe('When it is checked', () => {
      it('matches the snapshot', () => {
        const wrapper = mountBaseCheckbox({ checked: false });
        expect(wrapper.element).toMatchSnapshot();
      })
    });

    describe('When there is label', () => {
      it('renders the snapshot', () => {
        const wrapper = mountBaseCheckbox({ label: 'Newsletter' });
        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.vm.label).toBe('Newsletter');
      });
    });

    describe('When there is no label', () => {
      it('renders the snapshot', () => {
        const wrapper = mountBaseCheckbox();
        expect(wrapper.element).toMatchSnapshot();
      });
    });

    describe('When there is id', () => {
      it('renders the snapshot', () => {
        const wrapper = mountBaseCheckbox(null, { id: 'checkbox-term' });
        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.vm.$attrs.id).toBe('checkbox-term');
      });
    });

    describe('When there is no id', () => {
      it('renders the snapshot', () => {
        const wrapper = mountBaseCheckbox();
        expect(wrapper.element).toMatchSnapshot();
      });
    });
  });
});
