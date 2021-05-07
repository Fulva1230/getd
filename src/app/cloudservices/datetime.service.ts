import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DatetimeService {

  constructor(private http: HttpClient) {
  }

  now(): Observable<Date> {
    return this.http
      .get('https://discovery.googleapis.com/discovery/v1/apis', {
        observe: 'response'
      })
      .pipe(
        map(res => {
          return new Date(res.headers.get('date'));
        })
      );
  }
}
