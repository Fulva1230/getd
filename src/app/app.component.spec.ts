import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {ReplaySubject, Subject} from 'rxjs';
import createSpy = jasmine.createSpy;

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

  it('test subject error', () => {
    const subject = new ReplaySubject<any>(1);
    subject.error('wss');
    const func = createSpy();
    subject.subscribe(() => {
    }, func);
    expect(func).toHaveBeenCalledOnceWith('wss');
  });
});
