import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {PollListService} from '../../cloudservices/poll-list.service';
import {PollBoxDeliveryService} from '../../data-services/poll-box-delivery.service';
import {Pollbox} from '../../containers/pollbox';
import {combineLatest, Subscription} from 'rxjs';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-report-main',
  templateUrl: './report-main.component.html',
  styleUrls: ['./report-main.component.scss']
})
export class ReportMainComponent implements OnInit, OnChanges {
  subscriptions: Subscription[] = [];
  pollboxes = new Map<string, Pollbox>();
  pollBoxesTitle = new Set<string>();
  deadlineFormControl = new FormControl();
  selectedItemFormControl = new FormControl();
  selectedPollBox?: Pollbox;

  constructor(
    private pollListService: PollListService,
    private pollBoxDeliveryService: PollBoxDeliveryService
  ) {
  }

  ngOnInit(): void {
    this.pollListService.pollList.subscribe(pollList => {
      this.unsubscribeAll();
      for (const questionId of pollList) {
        const subscription = this.pollBoxDeliveryService.pollBoxObser(questionId).subscribe(pollbox => {
          if (!this.pollBoxesTitle.has(pollbox.question.title)) {
            this.pollBoxesTitle.add(pollbox.question.title);
            this.pollboxes.set(pollbox.question.title, pollbox);
          }
        });
        this.subscriptions.push(subscription);
      }
    });
    combineLatest(
      [this.deadlineFormControl.valueChanges, this.selectedItemFormControl.valueChanges]
    ).subscribe(([date, title]) => {
      this.selectedPollBox = this.pollboxes.get(title).report(date);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedItem) {
      console.log('fff');
      this.selectedPollBox = changes.selectedItem.currentValue;
    }
  }

  private unsubscribeAll(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
    this.subscriptions = [];
  }
}
