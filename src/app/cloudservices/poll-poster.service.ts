import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {DetermineRequest} from '../containers/determine-request';

@Injectable({
  providedIn: 'root'
})
export class PollPosterService {
  constructor() {
  }

  post(determineRequest: DetermineRequest): Observable<void> {
    throw new Error('Not implemented!');
  }
}
