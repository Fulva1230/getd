import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Pollbox} from '../containers/pollbox';

@Injectable({
  providedIn: 'root'
})
export class PollPullerService {

  constructor() {
  }

  /**
   * @param the questionId
   * @returns an observable of pollbox, the observable only emit once and complete
   */
  pull(questionId: string): Observable<Pollbox> {
    throw new Error();
  }
}
