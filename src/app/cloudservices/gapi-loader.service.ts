import {Injectable} from '@angular/core';
import {ReplaySubject, Subject} from 'rxjs';
import {first} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GapiLoaderService {
  notifier: Subject<boolean> = new ReplaySubject(1);

  constructor() {
    this.notifier.next(false);
  }

  tryLoad(): void {
    this.notifier.pipe(first()).subscribe((loaded) => {
      if (!loaded) {
        this.load();
      }
    });
  }

  private load(): void {
    throw new Error();
  }
}
