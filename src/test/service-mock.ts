import {of, ReplaySubject} from 'rxjs';
import {createFakePollbox, createFakePollList} from './sample-data';
import {PollboxComponent} from '../app/pollbox/pollbox.component';
import {PollPullerService} from '../app/cloudservices/poll-puller.service';
import {PollPosterService} from '../app/cloudservices/poll-poster.service';

export const mockPollList = () => {
  const pollListServiceSpy = jasmine.createSpyObj(['refresh']);
  pollListServiceSpy.refresh.and.callFake(() => {
    return of(createFakePollList());
  });
  return pollListServiceSpy;
};

export const mockPollPullerAndPoster = () => {
  const pollPosterSpy: jasmine.SpyObj<PollPosterService> = jasmine.createSpyObj(['post']);
  const pollPullerSpy: jasmine.SpyObj<PollPullerService> = jasmine.createSpyObj(['pull']);
  const thisPollbox = createFakePollbox();
  pollPullerSpy.pull.and.callFake((questionId) => {
    if (questionId === '123') {
      return of(thisPollbox);
    } else {
      return of();
    }
  });
  pollPosterSpy.post.and.callFake((request) => {
    const doneSubject = new ReplaySubject<void>(1);
    pollPullerSpy.pull(request.determine.questionId).subscribe((pollbox) => {
      pollbox.determines.push(request.determine);
      request.status = 'SUCCESS';
      doneSubject.next(undefined);
    });
    return doneSubject;
  });
  return {pollPullerSpy, pollPosterSpy};
};
