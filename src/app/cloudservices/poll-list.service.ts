import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {LoginService} from './login.service';
import {HttpClient} from '@angular/common/http';
import {settings} from '../../environments/drive.settings';
import {take, map, mergeAll} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PollListService {

  constructor(private loginService: LoginService, private http: HttpClient) {
  }

  /**
   * @returns an observable of poll-list, the obseravle should only return once and complete
   */
  refresh(): Observable<string[] | null> {
    return this.loginService.accessToken().pipe(take(1), map(accessToken => {
      if (accessToken) {
        return this.http.get('https://www.googleapis.com/drive/v3/files',
          {
            headers: {Authorization: `Bearer ${accessToken}`},
            params: settings
          }
        ).pipe(map(res => (res as any).files.map(file => file.id) as string[]));
      } else {
        return of(null);
      }
    }), mergeAll());
  }
}
