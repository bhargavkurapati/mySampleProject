import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scatter-chart',
  templateUrl: './scatter-chart.component.html',
  styleUrls: ['./scatter-chart.component.css']
})
export class ScatterChartComponent {
  constructor() { }

  options:any = {
    chart: {
        type: 'scatterChart',
        height: 450,
        color: d3.scale.category10().range(),
        scatter: {
            onlyCircles: false
        },
        showDistX: true,
        showDistY: true,
      //tooltipContent: function(d) {
      //    return d.series && '<h3>' + d.series[0].key + '</h3>';
      //},
        duration: 350,
        xAxis: {
            axisLabel: 'X Axis',
            tickFormat: function(d){
                return d3.format('.02f')(d);
            }
        },
        yAxis: {
            axisLabel: 'Y Axis',
            tickFormat: function(d){
                return d3.format('.02f')(d);
            },
            axisLabelDistance: -5
        },
        zoom: {
            //NOTE: All attributes below are optional
            enabled: true,
            scaleExtent: [1, 10],
            useFixedDomain: false,
            useNiceScale: false,
            horizontalOff: false,
            verticalOff: false,
            unzoomEventType: 'dblclick.zoom'
        }
    }
};
data:any = this.generateData(4,40);

/* Random Data Generator (took from nvd3.org) */
generateData(groups, points) {
    var data = [],
        shapes = ['circle', 'cross', 'triangle-up', 'triangle-down', 'diamond', 'square'],
        random = d3.random.normal();

    for (var i = 0; i < groups; i++) {
        data.push({
            key: 'Group ' + i,
            values: []
        });

        for (var j = 0; j < points; j++) {
            data[i].values.push({
                x: random()
                , y: random()
                , size: Math.random()
                , shape: shapes[j % 6]
            });
        }
    }
    return data;
}
 
 

}
