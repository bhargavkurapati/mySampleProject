import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guage-chart',
  templateUrl: './guage-chart.component.html',
  styleUrls: ['./guage-chart.component.scss']
})
export class GuageChartComponent implements OnInit {
 
  single: any[]= [
    {
      "name": "Indonesia",
      "value": 100
    },
    {
      "name": "Honkong",
      "value": 75
    },
    {
      "name": "Argentina",
      "value": 400
    },
    {
      "name": "Switzerland",
      "value": 190
    },
    {
      "name": "India",
      "value": 220
    },
    {
      "name": "Polanad",
      "value": 300
    }
  ];
  view: any[] = [500, 400];
  legend: boolean = true;
  legendPosition: string = 'below';

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor() {
    Object.assign(this, this.single);
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  ngOnInit(): void {
  }

}
