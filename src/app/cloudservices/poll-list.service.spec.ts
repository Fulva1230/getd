import { TestBed } from '@angular/core/testing';

import { PollListService } from './poll-list.service';

describe('PollListService', () => {
  let service: PollListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PollListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
