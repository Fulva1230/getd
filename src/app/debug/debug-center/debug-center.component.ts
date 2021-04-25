import {Component, OnInit} from '@angular/core';
import {PollListService} from '../../cloudservices/poll-list.service';

@Component({
  selector: 'app-debug-center',
  templateUrl: './debug-center.component.html',
  styleUrls: ['./debug-center.component.css']
})
export class DebugCenterComponent implements OnInit {
  files: string[] = [];

  constructor(private pollListService: PollListService) {
  }

  ngOnInit(): void {

  }

  listfiles(): void {
    this.pollListService.refresh().subscribe(files => {
      this.files = files;
    });
  }
}
