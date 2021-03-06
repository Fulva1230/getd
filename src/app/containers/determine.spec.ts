import {Determine} from './determine';

describe('Determine', () => {
  it('should create an instance and verify its value', () => {
    const determine = new Determine('John', '2', 'yes', new Date());
    expect(determine.applier).toBe('John');
    expect(determine.questionId).toBe('2');
    expect(determine.chosen).toBe('yes');
  });

  it('the order of determines', () => {
    const earlierDetermine = new Determine('John', '3', 'yes', new Date(2000, 12, 12));
    const laterDetermine = new Determine('John', '3', 'yes', new Date(1999, 12, 11));
    const dateCompareFunction = Determine.dateCompareFunction;
    expect(dateCompareFunction(earlierDetermine, laterDetermine)).toBeGreaterThan(0);
    expect(dateCompareFunction(laterDetermine, earlierDetermine)).toBeLessThan(0);
    expect(dateCompareFunction(earlierDetermine, earlierDetermine)).toBeCloseTo(0);
  });
});
