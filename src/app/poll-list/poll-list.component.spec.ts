import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PollListComponent} from './poll-list.component';
import {PollListService} from '../cloudservices/poll-list.service';
import {mockPollList, mockPollPullerAndPoster} from '../../test/service-mock';
import {PollboxComponent} from '../pollbox/pollbox.component';
import {PollPullerService} from '../cloudservices/poll-puller.service';
import {PollPosterService} from '../cloudservices/poll-poster.service';

describe('PollListComponent', () => {
  let component: PollListComponent;
  let fixture: ComponentFixture<PollListComponent>;

  beforeEach(async () => {
    const {pollPullerSpy, pollPosterSpy} = mockPollPullerAndPoster();
    await TestBed.configureTestingModule({
      declarations: [
        PollListComponent,
        PollboxComponent
      ],
      providers: [
        {provide: PollListService, useValue: mockPollList()},
        {provide: PollPullerService, useValue: pollPullerSpy},
        {provide: PollPosterService, useValue: pollPosterSpy},
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PollListComponent);
    component = fixture.componentInstance;
    component.applierName = 'stone';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get poll list', () => {
    expect(component.questionIds.length).toBe(4);
  });

  it('should have 4 children components', () => {
    const debugElement = fixture.debugElement;
    expect(debugElement.children.length).toBe(4);
  });

  it('children components have appropriate data binding', () => {
    const debugElement = fixture.debugElement;
    for (const childPollBox of debugElement.children) {
      const pollboxInst: PollboxComponent | undefined = childPollBox.componentInstance;
      expect(pollboxInst).toBeTruthy();
      if (pollboxInst) {
        expect(pollboxInst.applierName).toBe('stone');
        expect(pollboxInst.pollbox).toBeTruthy();
      }
    }
  });
});
