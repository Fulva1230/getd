import {Injectable} from '@angular/core';
import {Observable, ReplaySubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserEventService {
  private refreshObserver = new Subject<null>();
  private usernameSet = new ReplaySubject<string>();

  constructor() {
    this.usernameSet.next(localStorage.username);
  }

  refresh(): void {
    this.refreshObserver.next(null);
  }

  refreshObs(): Observable<null> {
    return this.refreshObserver;
  }

  updateUsername(name: string): void {
    localStorage.username = name;
    this.usernameSet.next(name);
  }

  updateUsernameObs(): Observable<string> {
    return this.usernameSet;
  }
}
