import {Pollbox} from './pollbox';
import {createPollbox} from '../../test/sample-data';

describe('Pollbox', () => {
  let pollbox: Pollbox;
  beforeEach(() => {
    pollbox = createPollbox();
  });

  it('sort by date', () => {
    expect(pollbox.determines[0].applier).toBe('John');
    expect(pollbox.determines[1].applier).toBe('Stack');
    expect(pollbox.determines[2].applier).toBe('John');
    pollbox.sortByDate();
    expect(pollbox.determines[0].applier).toBe('Cook');
    expect(pollbox.determines[1].applier).toBe('Alice');
    expect(pollbox.determines[2].applier).toBe('Stack');
  });

  it('latest applies', () => {
    const latestApplies = pollbox.latestApplies();
    expect(latestApplies.length).toBe(4);
    expect(latestApplies[0].datetime.getTime()).toBeCloseTo( new Date(1999, 11, 2, 11, 33).getTime());
    expect(latestApplies[1].applier).toBe('Alice');
  });
});
