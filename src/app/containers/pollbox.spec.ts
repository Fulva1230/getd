import {Pollbox} from './pollbox';
import {createFakePollbox} from '../../test/sample-data';

describe('Pollbox', () => {
  let pollbox: Pollbox;
  beforeEach(() => {
    pollbox = createFakePollbox();
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
    expect(latestApplies[0].applier).toBe('John');
    expect(latestApplies[0].chosen).toBe('yes');
    expect(latestApplies[0].datetime.getTime()).toBeCloseTo(new Date(1999, 12, 19, 12, 23).getTime());
    expect(latestApplies[1].applier).toBe('Alice');
  });

  it('test report 1', () => {
    const reportPollBox = pollbox.report(new Date(1999, 11, 25, 11, 33));
    expect(reportPollBox.determines.length).toBe(2);
    expect(reportPollBox.determines[0].applier).toBe('Alice');
    expect(reportPollBox.determines[1].applier).toBe('Cook');
  });

  it('test report 2', () => {
    const reportPollBox = pollbox.report(new Date(2000, 12, 1, 11, 33));
    expect(reportPollBox.determines.length).toBe(4);
    expect(reportPollBox.determines[0].applier).toBe('John');
  });
});
