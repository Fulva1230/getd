import {Determine} from './determine';
import {Question} from './question';

export class Pollbox {
  determines: Determine[];

  constructor(public question: Question) {
  }

  sortByDate(): void {
    this.determines.sort(Determine.dateCompareFunction);
  }

  latestApplies(): Determine[] {
    this.sortByDate();
    const cleanMap: Map<string, Determine> = new Map();
    this.determines.forEach((determine) => {
      cleanMap.set(determine.applier, determine);
    });
    const cleanedArray = Array.from(cleanMap.values());
    cleanedArray.sort(Determine.dateCompareFunction);
    return cleanedArray;
  }
}
