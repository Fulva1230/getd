import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Pollbox} from '../containers/pollbox';
import {Determine} from '../containers/determine';
import {DatetimeService} from '../cloudservices/datetime.service';
import {Question} from '../containers/question';
import {ToastNotifierService} from '../toast-notifier.service';
import {catchError, map, mergeAll} from 'rxjs/operators';
import {of} from 'rxjs';
import {PollBoxDeliveryService} from '../data-services/poll-box-delivery.service';

@Component({
  selector: 'app-pollbox',
  templateUrl: './pollbox.component.html',
  styleUrls: ['./pollbox.component.scss']
})
export class PollboxComponent implements OnInit, OnChanges {
  @Input() questionId: string;
  @Input() applierName: string;
  currentDetermine: string;
  pollbox: Pollbox = new Pollbox(new Question('', '', [], []));
  isDeterminePosting = false;

  constructor(
    private datetimeProvider: DatetimeService,
    private toastNotifier: ToastNotifierService,
    private pollBoxDeliveryService: PollBoxDeliveryService
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.pollBoxDeliveryService.pollBoxObser(this.questionId).subscribe(pollBox => {
      this.pollbox = pollBox;
      this.updateCurrentDetermine();
    });
  }

  async refreshPoll(): Promise<void> {
    return new Promise((res) => {
      this.pollBoxDeliveryService
        .request({type: 'poll', questionId: this.questionId})
        .subscribe(pollRes => {
          switch (pollRes.status) {
            case 'FAIL':
              this.toastNotifier.fail(`Failed to get pollBox ${this.questionId}`);
          }
          res();
        });
    });
  }

  determine(select: string): void {
    this.isDeterminePosting = true;
    this.datetimeProvider.now().pipe(
      map(date => {
        return this.pollBoxDeliveryService
          .request({type: 'post', determine: new Determine(this.applierName, this.questionId, select, date)});
      }),
      mergeAll(),
      catchError(err => {
        return of({status: 'FAIL'} as const);
      })
    ).subscribe(postRes => {
      switch (postRes.status) {
        case 'SUCCESS':
          this.toastNotifier.success('Successfully posted the choice');
          this.isDeterminePosting = false;
          this.refreshPoll().then();
          break;
        case 'FAIL':
          this.toastNotifier.fail('Failed to post the choice');
          this.isDeterminePosting = false;
          break;
      }
    });
  }

  private updateCurrentDetermine(): void {
    const determineCopy = this.pollbox.determines.slice();
    let determine = determineCopy.pop();
    let theChosen: string | null = null;
    while (determine) {
      if (determine.applier === this.applierName) {
        theChosen = determine.chosen;
        break;
      }
      determine = determineCopy.pop();
    }
    if (theChosen) {
      this.currentDetermine = theChosen;
    } else {
      this.currentDetermine = '';
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.applierName) {
      this.updateCurrentDetermine();
    }
  }
}
