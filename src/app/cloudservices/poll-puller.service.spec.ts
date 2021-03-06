import {TestBed} from '@angular/core/testing';

import {PollPullerService} from './poll-puller.service';
import {GapiLoaderService} from './gapi-loader.service';
import createSpyObj = jasmine.createSpyObj;
import {ReplaySubject, Subject} from 'rxjs';
import {Pollbox} from '../containers/pollbox';
import {createPollbox} from '../../test/sample-data';

describe('PollPullerService', () => {
  let pollpuller: PollPullerService;
  let gapiLoaderSpy: jasmine.SpyObj<GapiLoaderService>;

  beforeEach(() => {
    gapiLoaderSpy = createSpyObj('GapiLoaderService', ['tryLoad'], {notifier: new ReplaySubject(1)});
    gapiLoaderSpy.tryLoad.and.callFake(() => {
      gapiLoaderSpy.notifier.next(false);
      gapiLoaderSpy.notifier.next(true);
      gapiLoaderSpy.notifier.next(true);
    });
    TestBed.configureTestingModule({
      providers: [
        PollPullerService,
        {provide: GapiLoaderService, useValue: gapiLoaderSpy},
      ]
    });
    pollpuller = TestBed.inject(PollPullerService);
    spyOn(pollpuller, 'pull').and.callFake(() => {
      const observable: Subject<Pollbox> = new ReplaySubject(1);
      pollpuller.runWhenGapiLoaded(() => {
        observable.next(createPollbox());
        observable.complete();
      });
      return observable;
    });
  });

  it('should be created', () => {
    expect(pollpuller).toBeTruthy();
  });

  it('poll', (done) => {
    const pollobservable = pollpuller.pull();
    pollobservable.subscribe((apollbox) => {
      expect(apollbox.determines.length).toBe(6);
      done();
    });
  });
});
