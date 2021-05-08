import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Pollbox} from '../containers/pollbox';
import {LoginService} from './login.service';
import {catchError, first, map, mergeAll, take} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Question} from '../containers/question';
import {Determine} from '../containers/determine';

export interface PollBoxRes {
  status: 'SUCCESS' | 'FAIL';
  pollBox?: Pollbox;
}

@Injectable({
  providedIn: 'root'
})
export class PollPullerService {

  constructor(private loginService: LoginService, private http: HttpClient) {
  }

  /**
   * @returns an observable of PollBoxRes, the observable only emit once and complete
   * @param questionId is the question id found in drive response
   */
  pull(questionId: string): Observable<PollBoxRes> {
    return this.loginService.accessToken().pipe(
      take(1),
      map(accessToken => {
        if (accessToken) {
          return this.http.get(`https://sheets.googleapis.com/v4/spreadsheets/${questionId}`, {
            headers: {Authorization: `Bearer ${accessToken}`},
            params: {
              includeGridData: 'true',
              ranges: ['notes', 'selections', 'applies'],
              fields: 'spreadsheetId,properties/title,sheets(data(rowData(values(effectiveValue,formattedValue))))',
            }
          }).pipe(map<any, PollBoxRes>(res => {
            const resany = res as any;
            const {spreadsheetId, properties: {title}, sheets} = resany;
            const [{rowData: descriptions}, {rowData: selections}, {rowData: applies}] = sheets[0].data;
            const descrptionsStrArr: string[] = descriptions[0].values.map(value => value.effectiveValue.stringValue);
            const selectionsStrArr: string[] = selections[0].values.map(value => value.effectiveValue.stringValue);
            const question = new Question(spreadsheetId, title, descrptionsStrArr, selectionsStrArr);
            const pollbox = new Pollbox(question);
            if (applies) {
              pollbox.determines = applies.map(apply => {
                  const [chosen, name, datetime]: [string, string, string] = apply.values.map(value => value.formattedValue);
                  return new Determine(name, spreadsheetId, chosen, new Date(datetime));
                }
              );
            } else {
              pollbox.determines = [];
            }
            return {status: 'SUCCESS', pollBox: pollbox};
          }));
        } else {
          return of({status: 'FAIL' as const});
        }
      }),
      mergeAll(),
      catchError(err => {
        return of({status: 'FAIL'} as const);
      }),
      first());
  }
}
