import { shallowMount } from '@vue/test-utils';
import SnackbarNotice from './SnackbarNotice.vue';
import BaseNotice from './../BaseNotice';

describe('SnackbarNotice', () => {
  let wrapper;

  const setup = (props = {}) => {
    const defaultProps = {
      content: 'A content message',
      type: 'success'
    };

    const propsData = { ...defaultProps, ...props };
    return shallowMount(SnackbarNotice, { propsData });
  };

  beforeEach(() => {
    wrapper = null;
  });

  describe('Props', () => {
    describe('#type', () => {
      it('is valid when type is equal to success', () => {
        wrapper = setup();
        const { validator } = wrapper.vm.$options.props.type;
        expect(validator('success')).toBeTruthy();
      });

      it('is valid when type is equal to error', () => {
        wrapper = setup();
        const { validator } = wrapper.vm.$options.props.type;
        expect(validator('error')).toBeTruthy();
      });

      it('is valid when type is equal to warning', () => {
        wrapper = setup();
        const { validator } = wrapper.vm.$options.props.type;
        expect(validator('warning')).toBeTruthy();
      });

      it('is invalid when type is different than success or error', () => {
        wrapper = setup();
        const { validator } = wrapper.vm.$options.props.type;
        expect(validator('foobar')).toBeFalsy();
      });
    });

    describe('#content', () => {
      it('is invalid when it is an object without the required keys', () => {
        wrapper = setup();

        const { validator } = wrapper.vm.$options.props.content;

        expect(validator({ title: 'Some title' })).toBeFalsy();
        expect(validator({ message: 'Some title' })).toBeFalsy();
      });

      it('is valid when it is an object with the required keys', () => {
        wrapper = setup();

        const { validator } = wrapper.vm.$options.props.content;

        expect(validator({
          title: 'Some title',
          message: 'Some message example here'
        })).toBeTruthy();
      });
    });

    describe('#timeout', () => {
      it('returns 5000 when the prop is not passed', () => {
        wrapper = setup();
        expect(wrapper.vm.timeout).toEqual(5000);
      });
    });
  });

  describe('Computed', () => {
    describe('#props', () => {
      it('returns the proper plain object if "content" prop is a string', () => {
        wrapper = setup();

        expect(wrapper.vm.props).toEqual({
          title: 'A content message',
        });
      });

      it('returns the proper plain object if "content" is a valid object', () => {
        wrapper = setup({
          content: {
            title: 'Some title',
            message: 'Some message here'
          }
        });

        expect(wrapper.vm.props).toEqual({
          title: 'Some title',
          message: 'Some message here',
        });
      });
    });

    describe('#icon', () => {
      it('returns info-icon if type is equal to error', () => {
        wrapper = setup({
          type: 'error',
          content: 'Some title'
        });

        expect(wrapper.vm.icon).toEqual({ id: 'info.icon.svg', viewbox: '0 0 24 24' });
      });

      it('returns thumb-up icon if type is not equal to error (success)', () => {
        wrapper = setup({
          type: 'success',
          content: 'Some title'
        });

        expect(wrapper.vm.icon).toEqual({ id: 'thumb-up.icon.svg', viewbox: '0 0 24 24' });
      });
    });

    describe('#baseNoticeType', () => {
      it('returns danger when type is equal to error', () => {
        wrapper = setup({ type: 'error' });
        expect(wrapper.vm.baseNoticeType).toEqual('danger');
      });

      it('returns success when type is not equal to error', () => {
        wrapper = setup({ type: 'success' });
        expect(wrapper.vm.baseNoticeType).toEqual('success');
      });

      it('returns warning when type is equal to warning', () => {
        wrapper = setup({ type: 'warning' });
        expect(wrapper.vm.baseNoticeType).toEqual('warning');
      });
    });
  });

  describe('Render', () => {
    const props = {
      icon: { id: 'info.icon.svg', viewbox: '0 0 24 24' },
      snackbar: true,
      autoClose: true,
      scrollToSelf: true,
      type: 'success'
    };

    describe('Type is error', () => {
      it('renders BaseNotice properly', () => {
        wrapper = setup({
          content: 'The title here',
          type: 'error'
        });

        expect(wrapper.find(BaseNotice).vm.$props).toEqual({
          ...props,
          type: 'danger',
          title: 'The title here',
          message: undefined,
          timeout: 5000,
        });
      });
    });

    describe('Type is success', () => {
      it('renders BaseNotice properly', () => {
        wrapper = setup({
          content: 'The title here',
          type: 'success'
        });

        expect(wrapper.find(BaseNotice).vm.$props).toEqual({
          ...props,
          type: 'success',
          title: 'The title here',
          message: undefined,
          timeout: 5000,
        });
      });
    });

    describe('Content as string', () => {
      it('renders BaseNotice properly', () => {
        wrapper = setup({
          content: 'The title here',
          timeout: 6000
        });

        expect(wrapper.find(BaseNotice).vm.$props).toEqual({
          ...props,
          title: 'The title here',
          message: undefined,
          timeout: 6000,
        });
      });
    });

    describe('Content as valid object', () => {
      it('render BaseNotice properly', () => {
        wrapper = setup({
          content: {
            title: 'The important title here',
            message: 'An error details here if you want to',
          },
          timeout: 3000
        });

        expect(wrapper.find(BaseNotice).vm.$props).toEqual({
          ...props,
          title: 'The important title here',
          message: 'An error details here if you want to',
          timeout: 3000,
        });
      });
    });

    it('Matches the snapshot', () => {
      wrapper = setup({
        content: {
          title: 'The important title here',
          message: 'An error details here if you want to',
        },
      });

      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('Behavior', () => {
    it('emits "hide" event when BaseNotice emits hide event', () => {
      wrapper = setup();

      jest.spyOn(wrapper.vm, '$emit');

      wrapper.find(BaseNotice).vm.$emit('hide');

      expect(wrapper.vm.$emit).toHaveBeenCalledTimes(1);
      expect(wrapper.vm.$emit).toHaveBeenCalledWith('hide');
    });
  });
});
