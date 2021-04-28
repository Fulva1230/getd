import {Injectable} from '@angular/core';
import {Observable, of, ReplaySubject} from 'rxjs';
import {LoginService} from './login.service';
import {HttpClient} from '@angular/common/http';
import {settings} from '../../environments/drive.settings';
import {take, map, mergeAll} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PollListService {
  private pollListObserver = new ReplaySubject<string[] | null>(1);

  get pollList(): Observable<string[] | null> {
    return this.pollListObserver;
  }

  constructor(private loginService: LoginService, private http: HttpClient) {
  }

  /**
   * @returns an observable of poll list, the obseravle should only return once and complete,
   * if anything goes wrong, the return will be null or an error. If getting a new poll list,
   * this function update the observable from pollList()
   */
  refresh(): Observable<string[] | null> {
    return this.loginService.accessToken().pipe(take(1), map(accessToken => {
      if (accessToken) {
        return this.http.get('https://www.googleapis.com/drive/v3/files',
          {
            headers: {Authorization: `Bearer ${accessToken}`},
            params: settings
          }
        ).pipe(
          map(res => {
            if ((res as any).files) {
              const pollList = (res as any).files.map(file => file.id) as string[];
              this.pollListObserver.next(pollList);
              return pollList;
            } else {
              return null;
            }
          })
        );
      } else {
        return of(null);
      }
    }), mergeAll());
  }


}
