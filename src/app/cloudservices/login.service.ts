import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  tokenSubject = new ReplaySubject<string | null>(1);

  constructor() {
  }

  login(): void {
  }

  /**
   * @returns an observable give access token or null when there is no access token or the accesstoken previous given is expired.
   * The observable will continuously emit new acess token
   */
  accessToken(): Observable<string | null> {
    throw new Error();
  }
}
