import verge from 'verge';

let getCurrentBreakpoint;
let isExtraLarge;

jest.mock('verge', () => ({
  viewportW: jest.fn(() => 450)
}));

const utilsMock = {
  breakpointByWidth: jest.fn(() => 'customValue'),
};

describe('breakpoints', () => {
  beforeEach(() => {
    jest.doMock('./utils', () => utilsMock);
    jest.clearAllMocks()

    getCurrentBreakpoint = require('./breakpoints').getCurrentBreakpoint;
    isExtraLarge = require('./breakpoints').isExtraLarge;
  });

  describe('.getCurrentBreakpoint', () => {
    it('calls .breakpointByWidth properly', () => {
      expect(utilsMock.breakpointByWidth).not.toHaveBeenCalled();

      getCurrentBreakpoint();

      expect(utilsMock.breakpointByWidth).toHaveBeenCalledTimes(1);
      expect(utilsMock.breakpointByWidth).toHaveBeenCalledWith(450);
    });

    it('returns value of breakpointByWidth call', () => {
      expect(getCurrentBreakpoint()).toEqual('customValue');
    });
  });

  describe('isExtraLarge', () => {
    it('returns false when currentBreakpoint is xs', () => {
      utilsMock.breakpointByWidth = jest.fn(() => 'xs');

      expect(isExtraLarge()).toBe(false);
    });

    it('returns false when currentBreakpoint is sm', () => {
      utilsMock.breakpointByWidth = jest.fn(() => 'sm');
      expect(isExtraLarge()).toBe(false);
    });

    it('returns false when currentBreakpoint is md', () => {
      utilsMock.breakpointByWidth = jest.fn(() => 'md');
      expect(isExtraLarge()).toBe(false);
    });

    it('returns false when currentBreakpoint is lg', () => {
      utilsMock.breakpointByWidth = jest.fn(() => 'lg');
      expect(isExtraLarge()).toBe(false);
    });

    it('returns true when currentBreakpoint is xl', () => {
      utilsMock.breakpointByWidth = jest.fn(() => 'xl');
      expect(isExtraLarge()).toBe(true);
    });
  });
});
