import { breakpointByWidth } from './utils';

describe('breakpoints/utils', () => {
  describe('.breakpointByWidth', () => {
    it('returns xs when viewport width is less than 576', () => {
      const b1 = breakpointByWidth(575);
      const b2 = breakpointByWidth(1);
      const b3 = breakpointByWidth(576);

      expect(b1).toEqual('xs');
      expect(b2).toEqual('xs');
      expect(b3).not.toEqual('xs');
    });

    it('returns sm when viewport width is greater than 575px and less than 768px', () => {
      const b1 = breakpointByWidth(575);
      const b2 = breakpointByWidth(576);
      const b3 = breakpointByWidth(767);
      const b4 = breakpointByWidth(768);

      expect(b1).not.toEqual('sm');
      expect(b2).toEqual('sm');
      expect(b3).toEqual('sm');
      expect(b4).not.toEqual('sm');
    });

    it('returns md when viewport width is greater than 767px and less than 992px', () => {
      const b1 = breakpointByWidth(767);
      const b2 = breakpointByWidth(768);
      const b3 = breakpointByWidth(991);
      const b4 = breakpointByWidth(992);

      expect(b1).not.toEqual('md');
      expect(b2).toEqual('md');
      expect(b3).toEqual('md');
      expect(b4).not.toEqual('md');
    });

    it('returns lg when viewport width is greater than 991px and less than 1200px', () => {
      const b1 = breakpointByWidth(991);
      const b2 = breakpointByWidth(992);
      const b3 = breakpointByWidth(1199);
      const b4 = breakpointByWidth(1200);

      expect(b1).not.toEqual('lg');
      expect(b2).toEqual('lg');
      expect(b3).toEqual('lg');
      expect(b4).not.toEqual('lg');
    });

    it('return xl when viewport width is greater than 1199px', () => {
      const b1 = breakpointByWidth(1199);
      const b2 = breakpointByWidth(1200);
      const b3 = breakpointByWidth(1300);
      const b4 = breakpointByWidth(1400);

      expect(b1).not.toEqual('xl');
      expect(b2).toEqual('xl');
      expect(b3).toEqual('xl');
      expect(b4).toEqual('xl');
    });
  });
});
