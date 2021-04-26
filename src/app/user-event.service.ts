import {Injectable} from '@angular/core';
import {Observable, ReplaySubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserEventService {
  private pollListRefresh = new Subject<null>();
  private usernameSet = new ReplaySubject<string>();

  constructor() {
    this.usernameSet.next(localStorage.username);
  }

  refreshPollList(): void {
    this.pollListRefresh.next(null);
  }

  refreshPollListObs(): Observable<null> {
    return this.pollListRefresh;
  }

  updateUsername(name: string): void {
    localStorage.username = name;
    this.usernameSet.next(name);
  }

  updateUsernameObs(): Observable<string> {
    return this.usernameSet;
  }
}
