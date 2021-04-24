import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {DetermineRequest} from '../containers/determine-request';

@Injectable({
  providedIn: 'root'
})
export class PollPosterService {
  constructor() {
  }

  /**
   *
   *
   * @returns the observable to notify the completeness, if the determine fail to post to the web, the observable return an error
   */
  post(determineRequest: DetermineRequest): Observable<void> {
    throw new Error('Not implemented!');
  }
}
