import {Determine} from './determine';
import {Question} from './question';

export class Pollbox {
  determines: Determine[] = [];

  constructor(public question: Question) {
  }

  /**
   * sort in accessding order by dates
   */
  sortByDate(): void {
    this.determines.sort(Determine.dateCompareFunction);
  }

  latestApplies(): Determine[] {
    this.sortByDate();
    const cleanMap: Map<string, Determine> = new Map();
    this.determines.forEach((determine) => {
      cleanMap.set(determine.applier, determine);
    });
    const newArr = Array.from(cleanMap.values());
    newArr.sort(Determine.dateCompareFunction);
    newArr.reverse();
    return newArr;
  }

  report(deadline: Date): Pollbox {
    const copyPollbox = new Pollbox(this.question);
    for (const determine of this.determines) {
      if (determine.datetime.getTime() < deadline.getTime()) {
        copyPollbox.determines.push(determine);
      }
    }
    copyPollbox.determines = copyPollbox.latestApplies();
    return copyPollbox;
  }
}
