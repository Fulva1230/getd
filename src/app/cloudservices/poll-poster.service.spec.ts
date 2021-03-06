import {TestBed} from '@angular/core/testing';

import {PollPosterService} from './poll-poster.service';

describe('PollPosterService', () => {
  let service: PollPosterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PollPosterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
