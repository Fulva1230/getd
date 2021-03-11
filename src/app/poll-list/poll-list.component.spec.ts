import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PollListComponent} from './poll-list.component';
import {PollListService} from '../cloudservices/poll-list.service';
import {mockPollList} from '../../test/service-mock';

describe('PollListComponent', () => {
  let component: PollListComponent;
  let fixture: ComponentFixture<PollListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PollListComponent],
      providers: [
        {provide: PollListService, useValue: mockPollList()}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PollListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get poll list', () => {
    expect(component.questionIds.length).toBe(4);
  });
});
