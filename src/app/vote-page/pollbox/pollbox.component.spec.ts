import {PollboxComponent} from './pollbox.component';
import {DatetimeService} from '../../cloudservices/datetime.service';
import {mockDateTime, mockPollBoxDeliveryService, mockToastNotifier} from '../../../test/service-mock';

describe('PollboxComponent', () => {
  let component: PollboxComponent;
  let datetimeSpy: DatetimeService;

  beforeEach(() => {
    datetimeSpy = mockDateTime();
    component = new PollboxComponent(datetimeSpy, mockToastNotifier(), mockPollBoxDeliveryService());
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
