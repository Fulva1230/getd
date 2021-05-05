import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Pollbox} from "../../containers/pollbox";

@Component({
  selector: 'app-determines-chart',
  templateUrl: './determines-chart.component.html',
  styleUrls: ['./determines-chart.component.scss']
})
export class DeterminesChartComponent implements OnInit, OnChanges {
  @Input() pollBox: Pollbox;
  gradient = true;
  showLegend = true;
  showLabels = true;
  isDoughnut = false;
  legendPosition = 'below';
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  results: { name: string, value: number }[];

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.pollBox) {
      this.refreshView();
    }
  }

  refreshView(): void {
    const chartMap = new Map<string, number>();
    if (this.pollBox) {
      for (const selection of this.pollBox.question.selections) {
        chartMap.set(selection, 0);
      }
      for (const determine of this.pollBox.determines) {
        const curVal = chartMap.get(determine.chosen);
        chartMap.set(determine.chosen, curVal + 1);
      }
      this.results = [];
      for (const [key, value] of chartMap.entries()) {
        console.log(`${key} is ${value}`);
        this.results.push({name: key, value});
      }
    }
  }

  ngOnInit(): void {
    this.refreshView();
  }

}
