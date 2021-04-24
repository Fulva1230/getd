import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PollListService {

  constructor() {
  }

  /**
   * @returns an observable of poll-list, the obseravle should only return once and complete
   */
  refresh(): Observable<string[]> {
    return of();
  }
}
