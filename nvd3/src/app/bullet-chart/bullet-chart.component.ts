import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bullet-chart',
  templateUrl: './bullet-chart.component.html',
  styleUrls: ['./bullet-chart.component.css']
})
export class BulletChartComponent {

 options:any = {
    chart: {
        type: 'bulletChart',
        duration: 500
    }
  };

  data:any = {
    "title": "Revenue",
    "subtitle": "US$, in thousands",
    "ranges": [150,225,300],
    "measures": [220],
    "markers": [250]
  };

}
