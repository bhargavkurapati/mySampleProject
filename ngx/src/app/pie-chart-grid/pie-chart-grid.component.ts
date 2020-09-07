import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pie-chart-grid',
  templateUrl: './pie-chart-grid.component.html',
  styleUrls: ['./pie-chart-grid.component.scss']
})
export class PieChartGridComponent  {


  view: any[] = [600, 400];

  // options
  showLegend: boolean = true;
  showLabels: boolean = true;

  //PieChartGridComponent
  single: any[] = [
    {
      "name": "Indonesia",
      "value": 100
    },
    {
      "name": "Honkong",
      "value": 150
    },
    {
      "name": "Argentina",
      "value": 220
    },
    {
      "name": "Switzerland",
      "value": 180
    },
    {
      "name": "India",
      "value": 180
    },
    {
      "name": "Polanad",
      "value": 75
    }
    
  ];

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor() {
    Object.assign(this, this.single);
  }

  onSelect(event) {
    console.log(event);
  }
  

}
