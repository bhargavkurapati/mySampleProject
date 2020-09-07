import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bar-chart-horizontal',
  templateUrl: './bar-chart-horizontal.component.html',
  styleUrls: ['./bar-chart-horizontal.component.scss']
})
export class BarChartHorizontalComponent implements OnInit {

  multi: any[]= [
    {
      "name": "Germany",
      "series": [
        {
          "name": "2010",
          "value": 73000000
        },
        {
          "name": "2011",
          "value": 89400000
        }, 
        {
          "name": "1990",
          "value": 62000000
        }
      ]
    },
  
    {
      "name": "USA",
      "series": [
        {
          "name": "2010",
          "value": 309000000
        },
        {
          "name": "2011",
          "value": 311000000
        },
        {
          "name": "1990",
          "value": 250000000
        }
      ]
    },
  
    {
      "name": "France",
      "series": [
        {
          "name": "2010",
          "value": 50000020
        },
        {
          "name": "2011",
          "value": 58000000
        },
        {
          "name": "1990",
          "value": 58000000
        }
      ]
    },
    {
      "name": "UK",
      "series": [
        {
          "name": "2010",
          "value": 62000000
        },
        {
          "name": "1990",
          "value": 57000000
        }
      ]
    }
  ];  
  
  view: any[] = [700, 400];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'Country';
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'Normalized Population';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor() {
    Object.assign(this, this.multi)
  }

  onSelect(event) {
    console.log(event);
  }

  ngOnInit(): void {
  }

}
