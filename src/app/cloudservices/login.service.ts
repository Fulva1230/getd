import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {UserManager} from 'oidc-client';
import {settings} from '../../environments/signin.settings';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  tokenSubject = new ReplaySubject<string | null>(1);
  userManager = new UserManager(settings);

  constructor() {
    this.userManager.signinRedirectCallback().then(user => {
      this.tokenSubject.next(user.access_token);
    }, error => {
      console.error(error);
    });
  }

  login(): void {
    this.userManager.signinRedirect();
  }

  /**
   * @returns an observable giving access token or null when there is no access token or the accesstoken previous given is expired.
   * The observable will continuously emit new access token
   */
  accessToken(): Observable<string | null> {
    return this.tokenSubject;
  }
}
