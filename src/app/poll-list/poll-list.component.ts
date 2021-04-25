import {Component, Input, OnInit} from '@angular/core';
import {PollListService} from '../cloudservices/poll-list.service';
import {UserEventService} from '../user-event.service';

@Component({
  selector: 'app-poll-list',
  templateUrl: './poll-list.component.html',
  styleUrls: ['./poll-list.component.scss']
})
export class PollListComponent implements OnInit {
  @Input() applierName: string;
  public questionIds: string[] = [];

  constructor(private pollListService: PollListService, private userEventService: UserEventService) {
    this.userEventService.refreshPollListObs().subscribe(() => {
      this.refreshPollList();
    });
  }

  public refreshPollList(): void {
    this.pollListService.refresh().subscribe(questionIds => {
      this.questionIds = questionIds;
    });
  }

  ngOnInit(): void {
    this.refreshPollList();
  }
}
