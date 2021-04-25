import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {Subject} from 'rxjs';

describe('AppComponent', () => {
  it('test subject', () => {
    const subject = new Subject();
    let i = 0;
    subject.complete();
    subject.subscribe(val => {
    }, err => {
    }, () => {
      i = 1;
    });
    expect(i).toEqual(1);
  });
});
