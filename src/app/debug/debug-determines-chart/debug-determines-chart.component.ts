import {Component, OnInit} from '@angular/core';
import {createFakePollbox} from '../../../test/sample-data';

@Component({
  selector: 'app-debug-determines-chart',
  templateUrl: './debug-determines-chart.component.html',
  styleUrls: ['./debug-determines-chart.component.scss']
})
export class DebugDeterminesChartComponent implements OnInit {
  pollBox = createFakePollbox();

  constructor() {
  }

  ngOnInit(): void {
  }

}
