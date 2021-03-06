import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Pollbox} from '../containers/pollbox';

@Injectable({
  providedIn: 'root'
})
export class PollPullerService {

  constructor() {
  }

  pull(questionId: string): Observable<Pollbox> {
    throw new Error();
  }
}
