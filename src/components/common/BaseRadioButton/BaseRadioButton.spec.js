import { mount } from "@vue/test-utils";
import BaseRadioButton from './BaseRadioButton.vue';

describe('BaseRadioButton', () => {
  const defaultProps = {
    name: 'gender',
    value: 'male',
  }
  const mountBaseRadioButton = (props = {}, attributes = {} ) => {
    const propsData = { ...defaultProps, ...props };
    const attrs = { ...attributes };
    return mount(BaseRadioButton, { propsData, attrs });
  };

  describe('Defaults', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mountBaseRadioButton();
    });

    it('assigns checked prop as false', () => {
      expect(wrapper.vm.checked).toBe(false);
    });

    it('assigns label prop as an empty string', () => {
      expect(wrapper.vm.label).toBe('');
    });

    it('assigns label prop as no empty string', () => {
      wrapper = mountBaseRadioButton({ label: 'Male' });
      expect(wrapper.element).toMatchSnapshot();
      expect(wrapper.vm.label).toBe('Male');
    });
  });

  describe('Behavior', () => {
    describe('When it is checked and a click happens', () => {
      let wrapper;

      beforeAll(() => {
        wrapper = mountBaseRadioButton({ checked: true });
        wrapper.find('input').trigger('click');
      });

      it('does not emmit a change event', () => {
        const event = wrapper.emitted();
        expect(event).toMatchObject({});
      });
    })

    describe('when it is not checked and a click happens', () => {
      describe('and model prop is empty', () => {
        it('emmits a change event with proper params', () => {
          const wrapper = mountBaseRadioButton({ checked: false });
          wrapper.find('input').trigger('change');
          const event = wrapper.emitted().change[0][0];

          expect(event).toMatchObject({ name: 'gender', value: 'male' });
        });
      });

      describe('and model prop is not empty', () => {
        it('emmits a change event with proper params', () => {
          const wrapper = mountBaseRadioButton({ checked: false, model: 'customModel' });
          wrapper.find('input').trigger('change');
          const event = wrapper.emitted().change[0][0];

          expect(event).toMatchObject({ name: 'customModel', value: 'male' });
        });
      });
    });
  });

  describe('Render', () => {
    describe('when it is checked', () => {
      it('matches the snapshot', () => {
        const wrapper = mountBaseRadioButton({ checked: true });
        expect(wrapper.element).toMatchSnapshot();
      });
    });

    describe('when it is not checked', () => {
      it('matches the snapshot', () => {
        const wrapper = mountBaseRadioButton({ checked: false });
        expect(wrapper.element).toMatchSnapshot();
      });
    });

    describe('When there is label', () => {
      it('renders the snapshot', () => {
        const wrapper = mountBaseRadioButton({ label: 'Male' });
        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.vm.label).toBe('Male');
      });
    });

    describe('When there is no label', () => {
      it('renders the snapshot', () => {
        const wrapper = mountBaseRadioButton();
        expect(wrapper.element).toMatchSnapshot();
      });
    });

    describe('When there is id', () => {
      it('renders the snapshot', () => {
        const wrapper = mountBaseRadioButton(null, { id: 'radio-male' });
        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.vm.$attrs.id).toBe('radio-male');
      });
    });

    describe('When there is no id', () => {
      it('renders the snapshot', () => {
        const wrapper = mountBaseRadioButton();
        expect(wrapper.element).toMatchSnapshot();
      });
    });
  });
});
