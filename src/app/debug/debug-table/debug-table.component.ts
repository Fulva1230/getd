import {Component, OnInit} from '@angular/core';
import {createFakePollbox} from '../../../test/sample-data';
import {Pollbox} from '../../containers/pollbox';
import {Determine} from '../../containers/determine';

@Component({
  selector: 'app-debug-table',
  templateUrl: './debug-table.component.html',
  styleUrls: ['./debug-table.component.scss']
})
export class DebugTableComponent implements OnInit {
  pollBox = createFakePollbox();

  constructor() {
  }

  ngOnInit(): void {
  }

  addARow(): void {
    const box = new Pollbox(this.pollBox.question);
    box.determines = this.pollBox.determines;
    box.determines.push(new Determine('Fulva', '112233', 'yes', new Date()));
    this.pollBox = box;
  }
}
