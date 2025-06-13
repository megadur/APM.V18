import { NumberValidators } from './number.validator';
import { AbstractControl } from '@angular/forms';

describe('NumberValidators', () => {
  describe('range', () => {
    function mockControl(value: any): AbstractControl {
      return { value } as AbstractControl;
    }

    it('should return null if value is within range', () => {
      const validator = NumberValidators.range(1, 10);
      expect(validator(mockControl(5))).toBeNull();
      expect(validator(mockControl(1))).toBeNull();
      expect(validator(mockControl(10))).toBeNull();
    });

    it('should return {range: true} if value is less than min', () => {
      const validator = NumberValidators.range(1, 10);
      expect(validator(mockControl(0))).toEqual({ range: true });
      expect(validator(mockControl(-5))).toEqual({ range: true });
    });

    it('should return {range: true} if value is greater than max', () => {
      const validator = NumberValidators.range(1, 10);
      expect(validator(mockControl(11))).toEqual({ range: true });
      expect(validator(mockControl(100))).toEqual({ range: true });
    });

    it('should return {range: true} if value is not a number', () => {
      const validator = NumberValidators.range(1, 10);
      expect(validator(mockControl('abc'))).toEqual({ range: true });
      expect(validator(mockControl(NaN))).toEqual({ range: true });
    });

    it('should return null if value is null or undefined', () => {
      const validator = NumberValidators.range(1, 10);
      expect(validator(mockControl(null))).toBeNull();
      expect(validator(mockControl(undefined))).toBeNull();
      expect(validator(mockControl(''))).toBeNull();
    });
  });
});
