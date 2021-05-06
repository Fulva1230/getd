import {Injectable} from '@angular/core';
import {Observable, of, ReplaySubject} from 'rxjs';
import {LoginService} from './login.service';
import {catchError, map, mergeAll, take} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Determine} from '../containers/determine';

export interface PollPostRes {
  status: 'SUCCESS' | 'FAIL';
  determine: Determine;
}

@Injectable({
  providedIn: 'root'
})
export class PollPosterService {
  constructor(private loginService: LoginService, private http: HttpClient) {
  }

  // TODO change implementation to make it post when subscribed
  /**
   *
   *
   * @returns the observable to notify the completeness, if the determine fail to post to the web, the observable return an error
   */
  post(determine: Determine): Observable<PollPostRes> {
    const observable = new ReplaySubject<void>(1);
    return this.loginService.accessToken().pipe(
      take(1),
      map(accessToken => {
        if (accessToken) {
          const {chosen, applier, datetime} = determine;
          return this.http
            .post(`https://sheets.googleapis.com/v4/spreadsheets/${determine.questionId}/values/applies:append`,
              {
                range: 'applies',
                values: [[chosen, applier, `${datetime.getFullYear()}-${datetime.getMonth() + 1}-${datetime.getDate()} ${datetime.getHours()}:${datetime.getMinutes()}:${datetime.getSeconds()}`]]
              },
              {
                headers: {Authorization: `Bearer ${accessToken}`},
                params: {
                  insertDataOption: 'INSERT_ROWS',
                  valueInputOption: 'USER_ENTERED',
                },
                observe: 'response'
              })
            .pipe(map(
              res => {
                switch (res.status) {
                  case 201:
                    return {status: 'SUCCESS', determine} as const;
                  default:
                    return {status: 'FAIL', determine} as const;
                }
              }
            ));
        } else {
          return of({status: 'FAIL', determine} as const);
        }
      }),
      mergeAll(),
      catchError(err => {
        return of({status: 'FAIL', determine} as const);
      }));
  }
}
