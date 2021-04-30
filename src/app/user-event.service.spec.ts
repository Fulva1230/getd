import {TestBed} from '@angular/core/testing';

import {UserEventService} from './user-event.service';

describe('UserEventService', () => {
  let service: UserEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('test refresh', () => {
    const funcSpy = jasmine.createSpy();
    service.refreshObs().subscribe(funcSpy);
    service.refresh();
    expect(funcSpy).toHaveBeenCalledOnceWith(null);
  });

  it('test username', () => {
    const funcSpu = jasmine.createSpy();
    service.updateUsernameObs().subscribe(funcSpu);
    service.updateUsername('John');
    expect(funcSpu).toHaveBeenCalledWith('John');
    service.updateUsername('Lebron');
    expect(funcSpu).toHaveBeenCalledWith('Lebron');
  });
});
