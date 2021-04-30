import {Component, Input, OnInit} from '@angular/core';
import {Pollbox} from '../../containers/pollbox';

@Component({
  selector: 'app-pollbox-table',
  templateUrl: './pollbox-table.component.html',
  styleUrls: ['./pollbox-table.component.scss']
})
export class PollboxTableComponent implements OnInit {
  @Input() pollbox: Pollbox;

  constructor() { }

  ngOnInit(): void {
  }

}
