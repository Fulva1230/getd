import {Injectable} from '@angular/core';
import {GapiLoaderService} from './gapi-loader.service';
import {Observable} from 'rxjs';
import {Pollbox} from '../containers/pollbox';
import {first} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PollPullerService {

  constructor(private gapiLoader: GapiLoaderService) {
  }

  runWhenGapiLoaded(func: () => void): void {
    this.gapiLoader.tryLoad();
    this.gapiLoader.notifier.pipe(
      first((loaded) => loaded)
    ).subscribe((loaded) => {
      if (loaded) {
        func();
      }
    });
  }

  pull(): Observable<Pollbox> {
    throw new Error();
  }
}
