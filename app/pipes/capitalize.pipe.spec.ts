import { CapitalizePipe } from './capitalize.pipe';

export function main(): void {
  describe('CapitalizePipe', () => {
    let pipe: CapitalizePipe;

    beforeEach(() => {
      pipe = new CapitalizePipe();
    });

    it('transforms "american" to "American"', () => {
      expect(pipe.transform('american')).toEqual('American');
    });

    it('transforms "American" to "American"', () => {
      expect(pipe.transform('American')).toEqual('American');
    });

    it('transforms "test framework" to "Test Framework"', () => {
      expect(pipe.transform('test framework', ['all'])).toEqual('Test Framework');
    });

  });
}
