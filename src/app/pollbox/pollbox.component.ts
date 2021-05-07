import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Pollbox} from '../containers/pollbox';
import {PollPullerService} from '../cloudservices/poll-puller.service';
import {PollPosterService} from '../cloudservices/poll-poster.service';
import {Determine} from '../containers/determine';
import {DatetimeService} from '../cloudservices/datetime.service';
import {Question} from '../containers/question';
import {UserEventService} from '../user-event.service';
import {addWarning} from '@angular-devkit/build-angular/src/utils/webpack-diagnostics';
import {ToastNotifierService} from '../toast-notifier.service';
import {catchError, map, mergeAll} from 'rxjs/operators';
import {of} from 'rxjs';

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
    private pollPuller: PollPullerService,
    private pollPoster: PollPosterService,
    private datetimeProvider: DatetimeService,
    private userEventService: UserEventService,
    private toastNotifier: ToastNotifierService
  ) {
  }

  async ngOnInit(): Promise<void> {
    await this.refreshPoll();
    this.userEventService.refreshObs().subscribe(async () => {
      await this.refreshPoll();
    });
  }

  async refreshPoll(): Promise<void> {
    return new Promise((res) => {
      this.pollPuller.pull(this.questionId).subscribe((pollBox) => {
        if (pollBox.status === 'SUCCESS') {
          this.pollbox = pollBox.pollBox;
          this.updateCurrentDetermine();
        } else {
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
        return this.pollPoster.post(new Determine(this.applierName, this.questionId, select, date));
      }),
      mergeAll(),
      catchError(err => {
        this.isDeterminePosting = false;
        return of({status: 'FAIL'} as const);
      })
    ).subscribe(res => {
      switch (res.status) {
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
