import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PollListService {

  constructor() {
  }

  refresh(): Observable<string[]> {
    throw new Error('Not Implemented');
  }
}
