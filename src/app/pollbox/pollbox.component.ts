import {Component, Input, OnInit} from '@angular/core';
import {Pollbox} from '../containers/pollbox';

@Component({
  selector: 'app-pollbox',
  templateUrl: './pollbox.component.html',
  styleUrls: ['./pollbox.component.css']
})
export class PollboxComponent implements OnInit {
  @Input() pollbox: Pollbox;

  constructor() {
  }

  ngOnInit(): void {
  }
}
