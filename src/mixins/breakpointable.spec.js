
import Vue from 'vue';
import { mount } from '@vue/test-utils';
import { shallowMount } from '@vue/test-utils';

let GenericComponent;
let breakpointable;
let breakpointByWidth;
let globalWidth = 400;

const getGenericComponent = () => {
  breakpointable = require('./breakpointable').default;

  return GenericComponent = Vue.component('GenericComponent', {
    template: '<div>I am a generic component for test purpose</div>',
    mixins: [breakpointable]
  });
}

const setup = ({ width, methods }) => {
  jest.resetModules();

  jest.doMock('verge', () => ({
    viewportW: jest.fn(() => width || globalWidth)
  }));

  breakpointByWidth = jest.fn(() => 'md');

  jest.doMock('./../helpers/breakpoints/utils', () => ({ breakpointByWidth }));

  const GenericComponent = getGenericComponent();

  return mount(GenericComponent, { methods });
};

const shallowWithBreakpoint = (breakpoint) => {
  const GenericComponent = getGenericComponent();

  return shallowMount(GenericComponent, {
    computed: {
      breakpoint() { return breakpoint; }
    },
  });
};

describe('Breakpointable mixin', () => {
  beforeEach(() => {
    globalWidth = 400;
  });

  describe('Lifecycle', () => {
    describe('#mounted', () => {
      it('calls #setWidth when window triggers resize event', () => {
        const setWidth = jest.fn();
        const wrapper = setup({
          width: 400,
          methods: { setWidth }
        });

        expect(setWidth).not.toHaveBeenCalled();
        window.dispatchEvent(new Event('resize'));
        expect(setWidth).toHaveBeenCalledTimes(1);
      });
    });

    describe('#destroyed', () => {
      it('does not call #setWidth when window triggers resize event', () => {
        const setWidth = jest.fn();
        const wrapper = setup({
          width: 400,
          methods: { setWidth }
        });

        wrapper.destroy();

        expect(setWidth).not.toHaveBeenCalled();
        window.dispatchEvent(new Event('resize'));
        expect(setWidth).not.toHaveBeenCalled();
      });
    });
  });

  describe('Data', () => {
    describe('#viewportWidth', () => {
      it('returns viewport width', () => {
        const wrapper1 = setup({ width: 400 });
        const wrapper2 = setup({ width: 800 });
        const wrapper3 = setup({ width: 1200 });

        expect(wrapper1.vm.viewportWidth).toEqual(400)
        expect(wrapper2.vm.viewportWidth).toEqual(800)
        expect(wrapper3.vm.viewportWidth).toEqual(1200)
      });
    });
  });

  describe('Computed props', () => {
    describe('#breakpoint', () => {
      it('calls breakpointByWidth and returns its value', () => {
        const wrapper = setup({ width: 990 });
        expect(breakpointByWidth).not.toBeCalled();

        const value = wrapper.vm.breakpoint;

        expect(value).toEqual('md');
        expect(breakpointByWidth).toHaveBeenCalledTimes(1);
        expect(breakpointByWidth).toHaveBeenCalledWith(990);
      });
    });

    describe('#isMobileBreakpoint', () => {
      it('returns true when breakpoint is equal to xs', () => {
        const wrapper = shallowWithBreakpoint('xs');
        expect(wrapper.vm.isMobileBreakpoint).toBeTruthy();
      });

      it('returns true when breakpoint is equal to sm', () => {
        const wrapper = shallowWithBreakpoint('sm');
        expect(wrapper.vm.isMobileBreakpoint).toBeTruthy();
      });

      it('returns true when breakpoint is equal to md', () => {
        const wrapper = shallowWithBreakpoint('md');
        expect(wrapper.vm.isMobileBreakpoint).toBeTruthy();
      });

      it('returns false when breakpoint is equal to lg', () => {
        const wrapper = shallowWithBreakpoint('lg');
        expect(wrapper.vm.isMobileBreakpoint).toBeFalsy();
      });

      it('returns false when breakpoint is equal to xl', () => {
        const wrapper = shallowWithBreakpoint('xl');
        expect(wrapper.vm.isMobileBreakpoint).toBeFalsy();
      });
    });

    describe('#isTabletBreakpoint', () => {
      it('returns false when breakpoint is equal to xs', () => {
        const wrapper = shallowWithBreakpoint('xs');
        expect(wrapper.vm.isTabletBreakpoint).toBeFalsy();
      });

      it('returns false when breakpoint is equal to sm', () => {
        const wrapper = shallowWithBreakpoint('sm');
        expect(wrapper.vm.isTabletBreakpoint).toBeFalsy();
      });

      it('returns true when breakpoint is equal to md', () => {
        const wrapper = shallowWithBreakpoint('md');
        expect(wrapper.vm.isTabletBreakpoint).toBeTruthy();
      });

      it('returns false when breakpoint is equal to lg', () => {
        const wrapper = shallowWithBreakpoint('lg');
        expect(wrapper.vm.isTabletBreakpoint).toBeFalsy();
      });

      it('returns false when breakpoint is equal to xl', () => {
        const wrapper = shallowWithBreakpoint('xl');
        expect(wrapper.vm.isTabletBreakpoint).toBeFalsy();
      });
    });

    describe('#isDesktopBreakpoint', () => {
      it('returns false when breakpoint is equal to xs', () => {
        const wrapper = shallowWithBreakpoint('xs');
        expect(wrapper.vm.isDesktopBreakpoint).toBeFalsy();
      });

      it('returns false when breakpoint is equal to sm', () => {
        const wrapper = shallowWithBreakpoint('sm');
        expect(wrapper.vm.isDesktopBreakpoint).toBeFalsy();
      });

      it('returns false when breakpoint is equal to md', () => {
        const wrapper = shallowWithBreakpoint('md');
        expect(wrapper.vm.isDesktopBreakpoint).toBeFalsy();
      });

      it('returns true when breakpoint is equal to lg', () => {
        const wrapper = shallowWithBreakpoint('lg');
        expect(wrapper.vm.isDesktopBreakpoint).toBeTruthy();
      });

      it('returns true when breakpoint is equal to xl', () => {
        const wrapper = shallowWithBreakpoint('xl');
        expect(wrapper.vm.isDesktopBreakpoint).toBeTruthy();
      });
    });
  });

  describe('Methods', () => {
    describe('#setWidth', () => {
      it('set width to equal to viewport width', () => {
        const wrapper = setup({});

        expect(wrapper.vm.viewportWidth).toEqual(400);

        globalWidth = 800;
        wrapper.vm.setWidth();

        expect(wrapper.vm.viewportWidth).toEqual(800);
      });
    });
  });
});
