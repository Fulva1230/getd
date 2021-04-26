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
}
