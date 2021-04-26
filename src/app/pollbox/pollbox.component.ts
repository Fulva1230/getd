import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Pollbox} from '../containers/pollbox';
import {PollPullerService} from '../cloudservices/poll-puller.service';
import {PollPosterService} from '../cloudservices/poll-poster.service';
import {DetermineRequest} from '../containers/determine-request';
import {Determine} from '../containers/determine';
import {DatetimeService} from '../cloudservices/datetime.service';
import {Question} from '../containers/question';

@Component({
  selector: 'app-pollbox',
  templateUrl: './pollbox.component.html',
  styleUrls: ['./pollbox.component.scss']
})
export class PollboxComponent implements OnInit, OnChanges {
  @Input() questionId: string;
  @Input() applierName: string;
  // TODO this part may be improved
  currentDetermine: string;
  pollbox: Pollbox = new Pollbox(new Question('', '', [], []));

  constructor(
    private pollPuller: PollPullerService,
    private pollPoster: PollPosterService,
    private datetimeProvider: DatetimeService) {
  }

  async ngOnInit(): Promise<void> {
    await this.refreshPoll();
  }

  async refreshPoll(): Promise<void> {
    return new Promise((res) => {
      this.pollPuller.pull(this.questionId).subscribe((pollBox) => {
        this.pollbox = pollBox;
        this.updateCurrentDetermine();
        res();
      });
    });
  }

  determine(select: string): void {
    this.datetimeProvider.now().subscribe((date) => {
      this.pollPoster
        .post(new DetermineRequest(new Determine(this.applierName, this.questionId, select, date)))
        .subscribe(() => {
        }, _ => {
        }, () => {
          this.refreshPoll().then();
        });
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
