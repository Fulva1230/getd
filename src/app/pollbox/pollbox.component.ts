import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Pollbox} from '../containers/pollbox';
import {PollPullerService} from '../cloudservices/poll-puller.service';
import {PollPosterService} from '../cloudservices/poll-poster.service';
import {DetermineRequest} from '../containers/determine-request';
import {Determine} from '../containers/determine';
import {DatetimeService} from '../cloudservices/datetime.service';
import {Question} from '../containers/question';
import {UserEventService} from '../user-event.service';
import {addWarning} from '@angular-devkit/build-angular/src/utils/webpack-diagnostics';
import {ToastNotifierService} from '../toast-notifier.service';

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
    this.datetimeProvider.now().subscribe((date) => {
        this.pollPoster
          .post(new DetermineRequest(new Determine(this.applierName, this.questionId, select, date)))
          .subscribe(() => {
          }, _ => {
            this.toastNotifier.fail('Failed to post the choice');
            this.isDeterminePosting = false;
          }, () => {
            this.toastNotifier.success('Successfully posted the choice');
            this.isDeterminePosting = false;
            this.refreshPoll().then();
          });
      }, () => {
        this.isDeterminePosting = false;
      }
    );
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
