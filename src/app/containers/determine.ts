export class Determine {
  static dateCompareFunction = (determine1: Determine, determine2: Determine) => {
    return determine1.datetime.getTime() - determine2.datetime.getTime();
  };

  constructor(public applier: string, public questionId: string, public chosen: string, public datetime: Date) {
  }
}
