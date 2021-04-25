import {Component, OnInit} from '@angular/core';
import {PollListService} from '../../cloudservices/poll-list.service';
import {PollPullerService} from '../../cloudservices/poll-puller.service';

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
}
