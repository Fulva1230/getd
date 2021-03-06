import {Component, Input, OnInit} from '@angular/core';
import {Pollbox} from '../containers/pollbox';
import {PollPullerService} from '../cloudservices/poll-puller.service';
import {PollPosterService} from '../cloudservices/poll-poster.service';
import {DetermineRequest} from '../containers/determine-request';
import {Determine} from '../containers/determine';
import {DatetimeService} from '../cloudservices/datetime.service';

@Component({
  selector: 'app-pollbox',
  templateUrl: './pollbox.component.html',
  styleUrls: ['./pollbox.component.css']
})
export class PollboxComponent implements OnInit {
  @Input() questionId: string;
  @Input() applierName: string;
  pollbox: Pollbox;

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
        res();
      });
    });
  }

  determine(select: string): void {
    this.pollPoster
      .post(new DetermineRequest(new Determine(this.applierName, this.questionId, select, this.datetimeProvider.now())))
      .subscribe(() => {
        this.refreshPoll().then();
      });
  }
}
