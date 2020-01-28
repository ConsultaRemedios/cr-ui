import { max } from './index';

describe('#helpers' ,() => {
  describe('#max', () => {
    it('return max value of the array', () => {
      const values1 = [1, 5, 2, 22, 4];
      const values2 = [-11, -5, -7, -10];

      expect(max(values1)).toBe(22);
      expect(max(values2)).toBe(-5);
    });
  });
});
