import {Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {Pollbox} from '../../containers/pollbox';

type Row = { name: string, determine: string, date: string };

@Component({
  selector: 'app-pollbox-table',
  templateUrl: './pollbox-table.component.html',
  styleUrls: ['./pollbox-table.component.scss']
})
export class PollboxTableComponent implements OnInit, OnChanges {
  @Input() pollBox: Pollbox;
  rows: Row[] = [];
  columns = [{prop: 'name', flexGrow: 1}, {prop: 'determine', flexGrow: 1}, {
    prop: 'date',
    comparator: (a, b) => (new Date(a)).getTime() - (new Date(b)).getTime(),
    width: 200,
    flexGrow: 2
  }];

  constructor() {
  }

  ngOnInit(): void {
    this.reloadPollBox();
  }

  reloadPollBox(): void {
    if (this.pollBox) {
      const determines: Row[] = [];
      for (const determine of this.pollBox.determines) {
        determines.push({
          name: determine.applier,
          determine: determine.chosen,
          date: `${determine.datetime.toDateString()} ${determine.datetime.toTimeString().split(' ')[0]}`,
        });
      }
      this.rows = determines;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.pollBox) {
      this.reloadPollBox();
    }
  }

}
