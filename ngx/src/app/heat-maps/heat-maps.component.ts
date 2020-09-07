import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-heat-maps',
  templateUrl: './heat-maps.component.html',
  styleUrls: ['./heat-maps.component.scss']
})
export class HeatMapsComponent implements OnInit {
  single1: any[] =[
    {
      "name": "Germany",
      "series": [
        {
          "name": "2010",
          "value": 40632,
          "extra": {
            "code": "de"
          }
        },
        {
          "name": "2000",
          "value": 36953,
          "extra": {
            "code": "de"
          }
        },
        {
          "name": "1990",
          "value": 31476,
          "extra": {
            "code": "de"
          }
        }
      ]
    },
    {
      "name": "United States",
      "series": [
        {
          "name": "2010",
          "value": 0,
          "extra": {
            "code": "us"
          }
        },
        {
          "name": "2000",
          "value": 45986,
          "extra": {
            "code": "us"
          }
        },
        {
          "name": "1990",
          "value": 37060,
          "extra": {
            "code": "us"
          }
        }
      ]
    },
    {
      "name": "France",
      "series": [
        {
          "name": "2010",
          "value": 36745,
          "extra": {
            "code": "fr"
          }
        },
        {
          "name": "2000",
          "value": 34774,
          "extra": {
            "code": "fr"
          }
        },
        {
          "name": "1990",
          "value": 29476,
          "extra": {
            "code": "fr"
          }
        }
      ]
    },
    {
      "name": "United Kingdom",
      "series": [
        {
          "name": "2010",
          "value": 36240,
          "extra": {
            "code": "uk"
          }
        },
        {
          "name": "2000",
          "value": 32543,
          "extra": {
            "code": "uk"
          }
        },
        {
          "name": "1990",
          "value": 26424,
          "extra": {
            "code": "uk"
          }
        }
      ]
    }
  ];
  // single: any[] = [
  //   {
  //     "name": "Germany",
  //     "value": 8940000
  //   },
  //   {
  //     "name": "USA",
  //     "value": 5000000
  //   },
  //   {
  //     "name": "France",
  //     "value": 7200000
  //   }
  // ];
  
  // multi: any[] = [
  //   {
  //     "name": "Germany",
  //     "series": [
  //       {
  //         "name": "2010",
  //         "value": 7300000
  //       },
  //       {
  //         "name": "2011",
  //         "value": 8940000
  //       }
  //     ]
  //   },
  
  //   {
  //     "name": "USA",
  //     "series": [
  //       {
  //         "name": "2010",
  //         "value": 7870000
  //       },
  //       {
  //         "name": "2011",
  //         "value": 8270000
  //       }
  //     ]
  //   },
  
  //   {
  //     "name": "France",
  //     "series": [
  //       {
  //         "name": "2010",
  //         "value": 5000002
  //       },
  //       {
  //         "name": "2011",
  //         "value": 5800000
  //       }
  //     ]
  //   }
  // ];
  
 

  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population'; 

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor() {
    Object.assign(this, this.single1)   
  }
  
  onSelect(event) {
    console.log(event);
  }

  ngOnInit(): void {
  }

}
