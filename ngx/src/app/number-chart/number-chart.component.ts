import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-number-chart',
  templateUrl: './number-chart.component.html',
  styleUrls: ['./number-chart.component.scss']
})
export class NumberChartComponent implements OnInit {

  single: any[]= [
    {
      "name": "Germany",
      "value": 8940000
    },
    {
      "name": "USA",
      "value": 5000000
    },
    {
      "name": "France",
      "value": 7200000
    },
    {
      "name": "UK",
      "value": 5200000
    },
    {
      "name": "Italy",
      "value": 7700000
    },
    {
      "name": "Spain",
      "value": 4300000
    }
  ];
  view: any[] = [700, 400];

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };
  cardColor: string = '#232837';
  
  constructor() {
    Object.assign(this, this.single);
  }

  onSelect(event) {
    console.log(event);
  }

  ngOnInit(): void {
  }

}
