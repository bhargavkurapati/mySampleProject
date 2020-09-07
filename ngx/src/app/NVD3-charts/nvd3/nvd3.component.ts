import { Component, OnInit } from '@angular/core';
declare const d3: any;

@Component({
  selector: 'app-nvd3',
  templateUrl: './nvd3.component.html',
  styleUrls: ['./nvd3.component.scss']
})
export class Nvd3Component  {

  options:any = {
    chart: {
        type: 'pieChart',
        height: 500,
        x: function(d){return d.key;},
        y: function(d){return d.y;},
        showLabels: true,
        duration: 500,
        labelThreshold: 0.01,
        labelSunbeamLayout: true,
        legend: {
            margin: {
                top: 5,
                right: 35,
                bottom: 5,
                left: 0
            }
        }
    }
};

data:any = [
    {
        key: "One",
        y: 5
    },
    {
        key: "Two",
        y: 2
    },
    {
        key: "Three",
        y: 9
    },
    {
        key: "Four",
        y: 7
    },
    {
        key: "Five",
        y: 4
    },
    {
        key: "Six",
        y: 3
    },
    {
        key: "Seven",
        y: .5
    }
];


}
