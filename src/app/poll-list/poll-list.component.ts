import {Component, Input, OnInit} from '@angular/core';
import {PollListService} from '../cloudservices/poll-list.service';

@Component({
  selector: 'app-poll-list',
  templateUrl: './poll-list.component.html',
  styleUrls: ['./poll-list.component.scss']
})
export class PollListComponent implements OnInit {
  @Input() applierName: string;
  public questionIds: string[] = [];

  constructor(private pollListService: PollListService) {
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
