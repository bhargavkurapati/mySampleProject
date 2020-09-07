import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buble-chart',
  templateUrl: './buble-chart.component.html',
  styleUrls: ['./buble-chart.component.scss']
})
export class BubleChartComponent implements OnInit {

  bubbleData: any[]=  [
    {
      name: 'Total Applications',
      series: [
        {
          name: '2020-Q1',
          x: '2020-Q1',
          y: 80.3,
          r: 80.4
        },
        {
          name: '2020-Q2',
          x: '2020-Q2',
          y: 80.3,
          r: 78
        },
        {
          name: '2020-Q3',
          x: '2020-Q3',
          y: 75.4,
          r: 79
        }
      ]
    },
    {
      name: 'Applications in Intake',
      series: [
        {
          name: '2020-Q1',
          x: '2020-Q1',
          y: 78.8,
          r: 310
        },
        {
          name: '2020-Q2',
          x: '2020-Q2',
          y: 76.9,
          r: 283
        },
        {
          name: '2020-Q3',
          x: '2020-Q3',
          y: 75.4,
          r: 253
        }
      ]
    },
    {
      name: 'Application in Factory',
      series: [
        {
          name: '2020-Q1',
          x: '2020-Q1',
          y: 81.4,
          r: 63
        },
        {
          name: '2020-Q2',
          x: '2020-Q2',
          y: 79.1,
          r: 59.4
        },
        {
          name: '2020-Q3',
          x: '2020-Q3',
          y: 77.2,
          r: 56.9
        }
      ]
    },
    {
      name: 'Application Migration Completed',
      series: [
        {
          name: '2020-Q1',
          x: '2020-Q1',
          y: 80.2,
          r: 62.7
        },
        {
          name: '2020-Q2',
          x: '2020-Q2',
          y: 77.8,
          r: 58.9
        },
        {
          name: '2020-Q3',
          x: '2020-Q3',
          y: 75.7,
          r: 57.1
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
  yAxisLabel: string = 'Population';
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'Years';
  maxRadius: number = 20;
  minRadius: number = 5;
  yScaleMin: number = 70;
  yScaleMax: number = 85;
  xScaleMax: number = 85;
  xScaleMin: number = 0;
  
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor() {
    Object.assign(this, this.bubbleData );
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
