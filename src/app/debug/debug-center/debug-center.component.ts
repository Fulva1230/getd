import {Component, OnInit} from '@angular/core';
import {PollListService} from '../../cloudservices/poll-list.service';
import {PollPullerService} from '../../cloudservices/poll-puller.service';
import {PollPosterService} from '../../cloudservices/poll-poster.service';
import {Determine} from '../../containers/determine';
import {DetermineRequest} from '../../containers/determine-request';
import {DatetimeService} from '../../cloudservices/datetime.service';

@Component({
  selector: 'app-debug-center',
  templateUrl: './debug-center.component.html',
  styleUrls: ['./debug-center.component.css']
})
export class DebugCenterComponent implements OnInit {
  files: string[] = [];

  constructor(
    private pollListService: PollListService,
    private pollpullerService: PollPullerService,
    private pollposterService: PollPosterService,
    private datetimeService: DatetimeService
  ) {
  }

  ngOnInit(): void {

  }

  listfiles(): void {
    this.pollListService.refresh().subscribe(files => {
      console.log(files);
      this.files = files;
    });
  }

  pullpollbox(): void {
    this.pollpullerService.pull('1aVNKjj0RhBc1GMr6mj1wXZO3eUDhh2rTvVynAsc5rgU').subscribe(res => {
      console.log(res);
    });
  }

  postpollbox(): void {
    const determine = new Determine('nick', '1aVNKjj0RhBc1GMr6mj1wXZO3eUDhh2rTvVynAsc5rgU', 'sss', new Date());
    this.pollposterService.post(new DetermineRequest(determine)).subscribe(res => {
    }, err => {
      console.log(err);
    }, () => {
      console.log('complete');
    });
  }

  getDatetime(): void {
    this.datetimeService.now().subscribe(res => console.log(res));
  }
}
