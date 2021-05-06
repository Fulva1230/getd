import {of, ReplaySubject} from 'rxjs';
import {createFakePollbox, createFakePollList} from './sample-data';
import {PollboxComponent} from '../app/pollbox/pollbox.component';
import {PollPullerService} from '../app/cloudservices/poll-puller.service';
import {PollPosterService} from '../app/cloudservices/poll-poster.service';
import {Pollbox} from '../app/containers/pollbox';
import {DatetimeService} from '../app/cloudservices/datetime.service';
import {UserEventService} from '../app/user-event.service';
import {ToastNotifierService} from '../app/toast-notifier.service';

export const mockPollList = () => {
  const pollListSubject = new ReplaySubject<string[]>(1);
  const pollListServiceSpy = jasmine.createSpyObj(['refresh'], {pollList: pollListSubject});
  pollListServiceSpy.refresh.and.callFake(() => {
    pollListSubject.next(createFakePollList());
    return of(createFakePollList());
  });
  return pollListServiceSpy;
};

export const mockPollPullerAndPoster = () => {
  const pollPosterSpy: jasmine.SpyObj<PollPosterService> = jasmine.createSpyObj(['post']);
  const pollPullerSpy: jasmine.SpyObj<PollPullerService> = jasmine.createSpyObj(['pull']);
  const pollboxmap = new Map<string, Pollbox>();
  pollPullerSpy.pull.and.callFake((questionId) => {
    const optionalPollBox = pollboxmap.get(questionId);
    if (optionalPollBox) {
      return of({status: 'SUCCESS', pollBox: optionalPollBox});
    } else {
      const fakePollBox = createFakePollbox();
      pollboxmap.set(questionId, fakePollBox);
      return of({status: 'SUCCESS', pollBox: optionalPollBox});
    }
  });
  pollPosterSpy.post.and.callFake((request) => {
    const doneSubject = new ReplaySubject<void>(1);
    pollPullerSpy.pull(request.questionId).subscribe((pollbox) => {
      pollbox.pollBox.determines.push(request);
      doneSubject.next(undefined);
    });
    return doneSubject;
  });
  return {pollPullerSpy, pollPosterSpy};
};

export const mockDateTime = () => {
  const datetimeSpy: jasmine.SpyObj<DatetimeService> = jasmine.createSpyObj(['now']);
  datetimeSpy.now.and.callFake(() => {
    return of(new Date());
  });
  return datetimeSpy;
};

export const mockUserEventService = () => {
  return new UserEventService();
};

export const mockToastNotifier = () => {
  return jasmine.createSpyObj(['success', 'fail']) as jasmine.SpyObj<ToastNotifierService>;
};

