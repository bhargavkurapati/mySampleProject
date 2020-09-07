import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-line-fish-eye',
  templateUrl: './line-fish-eye.component.html',
  styleUrls: ['./line-fish-eye.component.css']
}) 
export class LineFishEyeComponent  {

  options:any = {
    chart: {
        type: 'lineWithFisheyeChart',
        height: 450,
        margin : {
            top: 20,
            right: 20,
            bottom: 60,
            left: 50
        },
        xAxis: {
            axisLabel: 'X Axis'
        },
        yAxis: {
            axisLabel: 'Y Axis',
            tickFormat: function(d){
                return d3.format(',.2f')(d);
            },
            axisLabelDistance: 35
        }
    }
};

data:any = this.sinAndCos();

/*Random Data Generator */
sinAndCos() {
    var sin = [],
        cos = [];

    //Data is represented as an array of {x,y} pairs.
    for (var i = 0; i < 500; i++) {
        sin.push({x: i, y: Math.sin(i/10)});
        cos.push({x: i, y: .5 * Math.cos(i/10 + 2) + Math.random() / 10});
    }

    //Line chart data should be sent as an array of series objects.
    return [
        {
            values: sin,      //values - represents the array of {x,y} data points
            key: 'Sine Wave', //key  - the name of the series.
            color: '#ff7f0e'  //color - optional: choose your own line color.
        },
        {
            values: cos,
            key: 'Cosine Wave',
            color: '#2ca02c'
        }
    ];
};

}
