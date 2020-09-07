import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tree-chart',
  templateUrl: './tree-chart.component.html',
  styleUrls: ['./tree-chart.component.scss']
})
export class TreeChartComponent implements OnInit {

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
  view: any[] = [700, 400];

  // options
  gradient: boolean = false;
  animations: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor() {
    Object.assign(this, this.single);
  }

  onSelect(event) {
    console.log(event);
  }

  labelFormatting(c) {
    return `${(c.label)} Population`;
  }
  ngOnInit(): void {
  }

}
