import {Component, OnInit} from '@angular/core';
import {PollListService} from '../../cloudservices/poll-list.service';
import {PollPullerService} from '../../cloudservices/poll-puller.service';
import {PollPosterService} from '../../cloudservices/poll-poster.service';
import {Determine} from '../../containers/determine';
import {DatetimeService} from '../../cloudservices/datetime.service';
import {PollBoxDeliveryService} from '../../data-services/poll-box-delivery.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-debug-center',
  templateUrl: './debug-center.component.html',
  styleUrls: ['./debug-center.component.scss']
})
export class DebugCenterComponent implements OnInit {
  files: string[] = [];

  constructor(
    private pollListService: PollListService,
    private pollpullerService: PollPullerService,
    private pollposterService: PollPosterService,
    private datetimeService: DatetimeService,
    private pollBoxDeliveryService: PollBoxDeliveryService
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
    this.pollposterService.post(determine).subscribe(res => {
    }, err => {
      console.log(err);
    }, () => {
      console.log('complete');
    });
  }

  getDatetime(): void {
    this.datetimeService.now().subscribe(res => console.log(res));
  }

  checkPollPullDelivery(): void {
    this.pollBoxDeliveryService.pollBoxObser('1aVNKjj0RhBc1GMr6mj1wXZO3eUDhh2rTvVynAsc5rgU').pipe(first()).subscribe(
      pollbox => {
        console.log(pollbox);
      }
    );
    this.pollBoxDeliveryService.request(
      {type: 'poll', questionId: '1aVNKjj0RhBc1GMr6mj1wXZO3eUDhh2rTvVynAsc5rgU'}
    ).subscribe(res => {
      console.log(res);
    });
  }

  checkPollPostDelivery(): void {
    const determine = new Determine('nick', '1aVNKjj0RhBc1GMr6mj1wXZO3eUDhh2rTvVynAsc5rgU', 'sss', new Date());
    this.pollBoxDeliveryService.request(
      {type: 'post', determine}
    ).subscribe(res => {
      console.log(res);
    });
  }
}
