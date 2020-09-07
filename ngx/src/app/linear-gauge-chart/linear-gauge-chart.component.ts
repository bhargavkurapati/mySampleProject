import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-linear-gauge-chart',
  templateUrl: './linear-gauge-chart.component.html',
  styleUrls: ['./linear-gauge-chart.component.scss']
})
export class LinearGaugeChartComponent implements OnInit {

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
      "name": "Italy",
      "value": 4500000
    },
    {
      "name": "Spain",
      "value": 5730000
    },{
      "name": "UK",
      "value": 8200000
    }
  ];
  view: any[] = [400, 400];
  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };
  value: number = 50;
  previousValue: number = 70;
  units: string = 'counts';

  onSelect(event) {
    console.log(event);
  }

  ngOnInit(): void {
  }

}
