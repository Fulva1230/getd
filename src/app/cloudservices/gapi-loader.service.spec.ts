import {TestBed} from '@angular/core/testing';

import {GapiLoaderService} from './gapi-loader.service';

describe('GapiLoaderService', () => {
  let service: GapiLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GapiLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
