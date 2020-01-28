import { mount } from '@vue/test-utils';
import loaderIcon from '../../../icons/loader.icon.svg';
import BaseButton from './BaseButton.vue';

const mountButton = ({
  buttonType = undefined,
  inverted = false,
  fill = false,
  size = 'medium',
  type = 'success',
  text,
  icon = undefined,
  path,
  atributtes = { },
}) => (
  mount(BaseButton, {
    propsData: {
      fill,
      size,
      type,
      inverted,
      buttonType,
      icon,
      path,
    },
    attrs: {
      ...atributtes
    },
    slots: {
      default: text
    },
  })
);

describe('BaseButton component', () => {
  describe('#buttonType prop', () => {
    it('matches the snapshoot when there is not buttonType prop', () => {
      const wrapper = mountButton({ text: 'Button' });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('matches the snapshoot when buttonType is equal to submit', () => {
      const wrapper = mountButton({ buttonType: 'submit', text: 'Button' });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('matches the snapshoot when buttonType is equal to button', () => {
      const wrapper = mountButton({ buttonType: 'button', text: 'Button' });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('is valid if the value is button', () => {
      const wrapper = mountButton({ buttonType: 'button', text: 'Button' });
      expect(wrapper.vm.$options.props.buttonType.validator('button')).toBeTruthy()
    });

    it('is valid if the value is submit', () => {
      const wrapper = mountButton({ buttonType: 'button', text: 'Button' });
      expect(wrapper.vm.$options.props.buttonType.validator('submit')).toBeTruthy()
    });

    it('is not valid if the value is not equal to button or submit', () => {
      const wrapper = mountButton({ text: 'Button' });

      ['asd', 'foo', 'bar', 'zaz', 'woww'].forEach((v) => {
        expect(wrapper.vm.$options.props.buttonType.validator(v)).toBeFalsy();
      });
    });
  });

  describe('#size prop', () => {
    it('matches the snapshoot when the size is "small"', () => {
      const wrapper = mountButton({ size: 'small', text: 'Small button' });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('matches the snapshot when the size is "medium"', () => {
      const wrapper = mountButton({ size: 'medium', text: 'Medium button' });
      expect(wrapper.element).toMatchSnapshot();
    })

    it('matches the snapshot when the size is "large"', () => {
      const wrapper = mountButton({ size: 'large', text: 'Large button' });
      expect(wrapper.element).toMatchSnapshot();
    })
  });

  describe('#type prop', () => {
    it('matches the snapshoot when the type is "success"', () => {
      const wrapper = mountButton({ type: 'success', text: 'Success button' });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('matches the snapshoot when the type is "info"', () => {
      const wrapper = mountButton({ type: 'info', text: 'Info button' });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('matches the snapshoot when the type is "warning"', () => {
      const wrapper = mountButton({ type: 'warning', text: 'Warning button' });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('matches the snapshoot when the type is "danger"', () => {
      const wrapper = mountButton({ type: 'danger', text: 'Danger button' });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('matches the snapshoot when the type is "neutral"', () => {
      const wrapper = mountButton({ type: 'neutral', text: 'Neutral button' });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('matches the snapshoot when the type is "naked"', () => {
      const wrapper = mountButton({ type: 'naked', text: 'Naked button' });
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('#fill prop', () => {
    describe('When fill is true', () => {
      it('matches the snapshot', () => {
        const wrapper = mountButton({ fill: true, text: 'Filled button' });
        expect(wrapper.element).toMatchSnapshot();
      });
    });

    describe('When fill is false', () => {
      it('matches the snapshot', () => {
        const wrapper = mountButton({ text: 'Unfilled button' });
        expect(wrapper.element).toMatchSnapshot();
      });
    });
  });

  describe('#inverted prop', () => {
    describe('When inverted is true', () => {
      it('matches the snapshot', () => {
        const wrapper = mountButton({ inverted: true, text: 'Inverted button' });
        expect(wrapper.element).toMatchSnapshot();
      });
    });

    describe('When inverted is false', () => {
      it('matches the snapshot', () => {
        const wrapper = mountButton({ text: 'Button' });
        expect(wrapper.element).toMatchSnapshot();
      });
    });
  });

  describe('#isLoading prop', () => {
    describe('When isLoading is true', () => {
      it('matches the snapshot', () => {
        const wrapper = mountButton({ isLoading: true, text: 'Loading button' });
        expect(wrapper.element).toMatchSnapshot();
      });
    });

    describe('When isLoading is false', () => {
      it('matches the snapshot', () => {
        const wrapper = mountButton({ text: 'Not Loading button' });
        expect(wrapper.element).toMatchSnapshot();
      });
    });
  });

  describe('#icon prop', () => {
    describe('when set an icon', () => {
      it('it matches the snapshot', () => {
        const wrapper = mountButton({ icon: { icon: loaderIcon }, text: 'Button success' });
        expect(wrapper.element).toMatchSnapshot();
      })
    })
  })

  describe('#rel prop', () => {
    describe('When has rel prop', () => {
      it('matches the snapshot', () => {
        const wrapper = mountButton({ text: 'Link button with rel', path: '/foo', atributtes: {  rel: 'nofollow' } });

        expect(wrapper.element).toMatchSnapshot();
      });
    });
  });

  describe('With combined props', () => {
    it('matches the snapshot', () => {
      const wrapper = mountButton({
        size: 'large',
        type: 'warning',
        fill: true,
        text: 'Combined button'
      });

      expect(wrapper.element).toMatchSnapshot();
    })
  });

  describe('When it is disabled', () => {
    it('matches the snapshot', () => {
      const wrapper = mountButton({
        type: 'danger',
        disabled: true,
        text: 'Disabled button'
      });
    });
  });
});
