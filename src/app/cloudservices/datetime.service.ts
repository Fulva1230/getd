import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatetimeService {

  constructor() {
  }

  now(): Date {
    throw new Error('Not implemented');
  }
}
