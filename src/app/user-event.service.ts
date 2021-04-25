import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserEventService {
  private pollListRefresh = new Subject<null>();

  constructor() {
  }

  refreshPollList(): void {
    this.pollListRefresh.next(null);
  }

  refreshPollListObs(): Observable<null> {
    return this.pollListRefresh;
  }
}
