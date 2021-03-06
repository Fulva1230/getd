import {Pollbox} from '../app/containers/pollbox';
import {Question} from '../app/containers/question';
import {Determine} from '../app/containers/determine';

export const createPollbox = () => {
  const pollboxinst = new Pollbox(new Question('123', '123', ['123456', '123456'], ['yes', 'no']));
  pollboxinst.determines = [
    new Determine('John', '123', 'yes', new Date(1999, 12, 19, 12, 23)),
    new Determine('Stack', '123', 'no', new Date(1999, 11, 30, 11, 33)),
    new Determine('John', '123', 'no', new Date(1999, 11, 31, 11, 33)),
    new Determine('Alice', '123', 'no', new Date(1999, 12, 1, 11, 33)),
    new Determine('Cook', '123', 'yes', new Date(1999, 11, 2, 11, 33)),
    new Determine('Alice', '123', 'yes', new Date(1999, 11, 3, 11, 33)),
  ];
  return pollboxinst;
};
