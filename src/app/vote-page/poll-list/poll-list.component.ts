import {Component, OnInit} from '@angular/core';
import {PollListService} from '../../cloudservices/poll-list.service';
import {UserEventService} from '../../user-event.service';

@Component({
  selector: 'app-poll-list',
  templateUrl: './poll-list.component.html',
  styleUrls: ['./poll-list.component.scss']
})
export class PollListComponent implements OnInit {
  applierName: string;
  public questionIds: string[] = [];

  constructor(
    private pollListService: PollListService,
    private userEventService: UserEventService) {
    this.userEventService.updateUsernameObs().subscribe(applierName => this.applierName = applierName);
  }

  ngOnInit(): void {
    this.pollListService.pollList.subscribe(questionIds => {
      this.questionIds = questionIds;
    });
  }
}
