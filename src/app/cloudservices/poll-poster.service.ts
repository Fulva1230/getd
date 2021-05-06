import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {DetermineRequest} from '../containers/determine-request';
import {LoginService} from './login.service';
import {map, mergeAll, take} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';



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
  post(determineRequest: DetermineRequest): Observable<void> {
    const observable = new ReplaySubject<void>(1);
    this.loginService.accessToken().pipe(take(1), map(accessToken => {
      if (accessToken) {
        const {chosen, applier, datetime} = determineRequest.determine;
        return this.http
          .post(`https://sheets.googleapis.com/v4/spreadsheets/${determineRequest.determine.questionId}/values/applies:append`,
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
            });
      } else {
        throw new Error('no access token');
      }
    }), mergeAll()).subscribe(res => {
    }, err => {
      determineRequest.status = 'FAILURE';
      observable.error(err);
    }, () => observable.complete());
    return observable;
  }
}
