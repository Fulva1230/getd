import {Component, Input, OnInit} from '@angular/core';
import {PollListService} from '../cloudservices/poll-list.service';
import {UserEventService} from '../user-event.service';

@Component({
  selector: 'app-poll-list',
  templateUrl: './poll-list.component.html',
  styleUrls: ['./poll-list.component.scss']
})
export class PollListComponent implements OnInit {
  applierName: string;
  public questionIds: string[] = [];
  refreshFailed = false;

  constructor(
    private pollListService: PollListService,
    private userEventService: UserEventService) {
    this.userEventService.refreshPollListObs().subscribe(() => {
      this.refreshPollList();
    });
    this.userEventService.updateUsernameObs().subscribe(name => this.applierName = name);
  }

  public refreshPollList(): void {
    this.pollListService.refresh().subscribe(questionIds => {
      if (questionIds) {
        this.questionIds = questionIds;
        this.refreshFailed = false;
      } else {
        this.refreshFailed = true;
      }
    });
  }

  ngOnInit(): void {
  }
}
