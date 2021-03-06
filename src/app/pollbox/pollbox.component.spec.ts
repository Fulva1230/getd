import {PollboxComponent} from './pollbox.component';
import {createPollbox} from '../../test/sample-data';
import createSpyObj = jasmine.createSpyObj;
import {PollPosterService} from '../cloudservices/poll-poster.service';
import {of, ReplaySubject, Subject} from 'rxjs';
import {PollPullerService} from '../cloudservices/poll-puller.service';
import {DatetimeService} from '../cloudservices/datetime.service';

describe('PollboxComponent', () => {
  let component: PollboxComponent;
  let pollPosterSpy: jasmine.SpyObj<PollPosterService>;
  let pollPullerSpy: jasmine.SpyObj<PollPullerService>;
  let datetimeSpy: jasmine.SpyObj<DatetimeService>;

  beforeEach(() => {
    pollPosterSpy = createSpyObj('PollPoster', ['post']);
    pollPullerSpy = createSpyObj('PollPuller', ['pull']);
    datetimeSpy = createSpyObj('Datetime', ['now']);
    component = new PollboxComponent(pollPullerSpy, pollPosterSpy, datetimeSpy);
    const thisPollbox = createPollbox();
    pollPullerSpy.pull.and.callFake((questionId) => {
      if (questionId === '123') {
        return of(thisPollbox);
      } else {
        return of();
      }
    });
    component.questionId = '123';
    component.applierName = 'Stone';
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('post determine', () => {
    pollPosterSpy.post.and.callFake((request) => {
      const doneSubject = new ReplaySubject<void>(1);
      pollPullerSpy.pull(request.determine.questionId).subscribe((pollbox) => {
        pollbox.determines.push(request.determine);
        request.status = 'SUCCESS';
        doneSubject.next(undefined);
      });
      return doneSubject;
    });
    const nowdatetime = new Date();
    datetimeSpy.now.and.returnValues(nowdatetime);
    component.determine('yes');
    expect(component.pollbox.determines.length).toBe(7);
    expect(component.pollbox.determines[6].applier).toBe('Stone');
    expect(component.pollbox.determines[6].datetime.getTime()).toBe(nowdatetime.getTime());

  });
});
