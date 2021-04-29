import {PollboxComponent} from './pollbox.component';
import {PollPosterService} from '../cloudservices/poll-poster.service';
import {PollPullerService} from '../cloudservices/poll-puller.service';
import {DatetimeService} from '../cloudservices/datetime.service';
import {mockDateTime, mockPollPullerAndPoster, mockUserEventService} from '../../test/service-mock';

describe('PollboxComponent', () => {
  let component: PollboxComponent;
  let pollPosterSpy: PollPosterService;
  let pollPullerSpy: PollPullerService;
  let datetimeSpy: DatetimeService;

  beforeEach(() => {
    ({pollPullerSpy, pollPosterSpy} = mockPollPullerAndPoster());
    datetimeSpy = mockDateTime();
    component = new PollboxComponent(pollPullerSpy, pollPosterSpy, datetimeSpy, mockUserEventService());
    component.questionId = '123';
    component.applierName = 'Stone';
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('post determine', () => {
    component.determine('yes');
    expect(component.pollbox.determines.length).toBe(7);
    expect(component.pollbox.determines[6].applier).toBe('Stone');
    expect(component.pollbox.determines[6].datetime.getTime()).toBeLessThanOrEqual(new Date().getTime());
  });
});
