import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {PollListService} from '../../cloudservices/poll-list.service';
import {PollBoxDeliveryService} from '../../data-services/poll-box-delivery.service';
import {Pollbox} from '../../containers/pollbox';
import {Observable, Subject} from 'rxjs';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-report-main',
  templateUrl: './report-main.component.html',
  styleUrls: ['./report-main.component.scss']
})
export class ReportMainComponent implements OnInit, OnChanges {
  pollBoxObserMap: Map<string, Observable<Pollbox>> = new Map<string, Observable<Pollbox>>();
  pollBoxMap = new Map<string, Pollbox>();
  deadlineFormControl = new FormControl();

  constructor(
    private pollListService: PollListService,
    private pollBoxDeliveryService: PollBoxDeliveryService
  ) {
  }

  ngOnInit(): void {
    this.pollListService.pollList.subscribe(pollList => {
      for (const questionId of pollList) {
        if (!this.pollBoxObserMap.has(questionId)) {
          const observ = this.pollBoxDeliveryService.pollBoxObser(questionId);
          this.pollBoxObserMap.set(questionId, observ);
          observ.subscribe(pollbox => {
            this.pollBoxMap.set(pollbox.question.title, pollbox);
          });
        }
      }
    });
    this.deadlineFormControl.valueChanges.subscribe(value => {
      console.log(value);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.deadline) {
      console.log(changes.deadline);
    }
  }
}
