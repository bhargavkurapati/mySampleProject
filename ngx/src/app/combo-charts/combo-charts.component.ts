  import {
    Component,
    Input,
    ViewEncapsulation,
    Output,
    EventEmitter,
    ChangeDetectionStrategy,
    ViewChild,
    HostListener,
    OnInit,
    OnChanges,
    ContentChild,
    TemplateRef
  } from '@angular/core';
  import {
    trigger,
    state,
    style,
    animate,
    transition
  } from '@angular/animations';
  
  import {
    NgxChartsModule, BaseChartComponent, LineComponent, LineSeriesComponent,
    calculateViewDimensions, ViewDimensions, ColorHelper
  } from '@swimlane/ngx-charts';
  import { area, line, curveLinear } from 'd3-shape';
  import { scaleBand, scaleLinear, scalePoint, scaleTime } from 'd3-scale';
  //import { barChart, lineChartSeries } from '../data/data';
  
  @Component({
    selector: 'app-combo-charts',
    templateUrl: './combo-charts.component.html',
    styleUrls: ['./combo-charts.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class ComboChartsComponent extends BaseChartComponent implements OnInit {
  
    @ViewChild(LineSeriesComponent) lineSeriesComponent: LineSeriesComponent;
  
     lineChart: any[] = [
      {
        value: 50,
        name: 'USA',
      },
      {
        value: 80,
        name: 'United Kingdom',
      },
      {
        value: 85,
        name: 'France',
      },
      {
        value: 90,
        name: 'Japan',
    
      },
      {
        value: 100,
        name: 'China'
    
      }
    ];
    
    lineChartSeries: any[] = [
      {
        name: 'Tablets',
        series: [
              {
          name: 'USA',
          value: 50
        },
          {
            value: 80,
            name: 'United Kingdom'
          },
          {
            value: 85,
            name: 'France'
          },
          {
            value: 90,
            name: 'Japan'
          },
          {
            value: 100,
            name: 'China'
          }
        ]
      },
        {
        name: 'Cell Phones',
        series: [
              {
          value: 10,
          name: 'USA'
        },
          {
            value: 20,
            name: 'United Kingdom'
          },
          {
            value: 30,
            name: 'France'
          },
          {
            value: 40,
            name: 'Japan'
          },
          {
            value: 10,
            name: 'China'
          }
        ]
      },
        {
        name: 'Computers',
        series: [
              {
          value: 2,
          name: 'USA',
    
        },
          {
            value: 4,
            name: 'United Kingdom'
          },
          {
            value: 20,
            name: 'France'
          },
          {
            value: 30,
            name: 'Japan'
          },
          {
            value: 35,
            name: 'China'
          }
        ]
      }
    ];
    
   barChart: any[] = [
      {
        name: 'USA',
        value: 50000
      },
      {
        name: 'United Kingdom',
        value: 30000
      },
      {
        name: 'France',
        value: 10000
      },
      {
        name: 'Japan',
        value: 5000
      },
      {
        name: 'China',
        value: 500
      }
    ];

    dateData = [
      {
        "name": "Barbados",
        "series": [
          {
            "value": 3617,
            "name": "2016-09-13T23:43:34.722Z"
          },
          {
            "value": 4896,
            "name": "2016-09-14T08:02:14.934Z"
          },
          {
            "value": 5514,
            "name": "2016-09-20T10:33:33.327Z"
          },
          {
            "value": 6590,
            "name": "2016-09-13T07:31:48.422Z"
          },
          {
            "value": 2454,
            "name": "2016-09-19T15:27:08.880Z"
          }
        ]
      },
      {
        "name": "Montserrat",
        "series": [
          {
            "value": 6428,
            "name": "2016-09-13T23:43:34.722Z"
          },
          {
            "value": 2689,
            "name": "2016-09-14T08:02:14.934Z"
          },
          {
            "value": 2572,
            "name": "2016-09-20T10:33:33.327Z"
          },
          {
            "value": 4152,
            "name": "2016-09-13T07:31:48.422Z"
          },
          {
            "value": 3398,
            "name": "2016-09-19T15:27:08.880Z"
          }
        ]
      },
      {
        "name": "Bermuda",
        "series": [
          {
            "value": 3468,
            "name": "2016-09-13T23:43:34.722Z"
          },
          {
            "value": 4585,
            "name": "2016-09-14T08:02:14.934Z"
          },
          {
            "value": 3033,
            "name": "2016-09-20T10:33:33.327Z"
          },
          {
            "value": 4649,
            "name": "2016-09-13T07:31:48.422Z"
          },
          {
            "value": 3748,
            "name": "2016-09-19T15:27:08.880Z"
          }
        ]
      },
      {
        "name": "Cuba",
        "series": [
          {
            "value": 3504,
            "name": "2016-09-13T23:43:34.722Z"
          },
          {
            "value": 4486,
            "name": "2016-09-14T08:02:14.934Z"
          },
          {
            "value": 3198,
            "name": "2016-09-20T10:33:33.327Z"
          },
          {
            "value": 3071,
            "name": "2016-09-13T07:31:48.422Z"
          },
          {
            "value": 6312,
            "name": "2016-09-19T15:27:08.880Z"
          }
        ]
      },
      {
        "name": "Lebanon",
        "series": [
          {
            "value": 3784,
            "name": "2016-09-13T23:43:34.722Z"
          },
          {
            "value": 6691,
            "name": "2016-09-14T08:02:14.934Z"
          },
          {
            "value": 4538,
            "name": "2016-09-20T10:33:33.327Z"
          },
          {
            "value": 6281,
            "name": "2016-09-13T07:31:48.422Z"
          },
          {
            "value": 4311,
            "name": "2016-09-19T15:27:08.880Z"
          }
        ]
      }
    ]
  
    view = null;
  
    curve: any = curveLinear;
    legend = true;
    legendTitle: string = 'Legend';
    xAxis = true;
    yAxis = true;
    showXAxisLabel = true;
    showYAxisLabel = true;
    showRightYAxisLabel = true;
    xAxisLabel = 'Country';
    yAxisLabel = 'GDP Per Capita';
    yAxisLabelRight = 'Utilization';
    tooltipDisabled: boolean = false;
    gradient: boolean;
    showGridLines: boolean = true;
    activeEntries: any[] = [];
    schemeType = 'ordinal';
    xAxisTickFormatting: any;
    yAxisTickFormatting: any;
    yRightAxisTickFormatting: any;
    roundDomains: boolean = false;
    colorSchemeLine = {
      name: 'coolthree',
      selectable: true,
      group: 'Ordinal',
      domain: [
        '#01579b', '#7aa3e5', '#a8385d', '#00bfa5'
      ]
    };
    autoScale = true;
    //lineChart = this.lineChartSeries;
    yLeftAxisScaleFactor: any;
    yRightAxisScaleFactor: any;
    rangeFillOpacity: number;
    animations: boolean = true;
  
    @Output() activate: EventEmitter<any> = new EventEmitter();
    @Output() deactivate: EventEmitter<any> = new EventEmitter();
  
    @ContentChild('tooltipTemplate') tooltipTemplate: TemplateRef<any>;
    @ContentChild('seriesTooltipTemplate') seriesTooltipTemplate: TemplateRef<any>;
  
  
    dims: ViewDimensions;
    xScale: any;
    yScale: any;
    xDomain: any;
    yDomain: any;
    transform: string;
    colors: ColorHelper;
    colorsLine: ColorHelper;
    margin: any[] = [10, 20, 10, 20];
    xAxisHeight: number = 0;
    yAxisWidth: number = 0;
    legendOptions: any;
    scaleType = 'Ordinal';
    xScaleLine;
    yScaleLine;
    xDomainLine;
    yDomainLine;
    seriesDomain;
    scaledAxis;
    combinedSeries;
    xSet;
    filteredDomain;
    hoveredVertical;
    yOrientLeft = 'left';
    yOrientRight = 'right';
    legendSpacing = 0;
    bandwidth;
    barPadding = 8;
    results = this.barChart;
  
    trackBy(index, item): string {
      return item.name;
    }
  
    ngOnInit() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.view = this.getViewDimensions();
      this.update();
    }
  
    getViewDimensions() {
      return undefined
    }
  
    update(): void {
      super.update();
      this.dims = calculateViewDimensions({
        width: this.width,
        height: this.height,
        margins: this.margin,
        showXAxis: this.xAxis,
        showYAxis: this.yAxis,
        xAxisHeight: this.xAxisHeight,
        yAxisWidth: this.yAxisWidth,
        showXLabel: this.showXAxisLabel,
        showYLabel: this.showYAxisLabel,
        showLegend: this.legend,
        legendType: this.schemeType
      });
  
      if (!this.yAxis) {
        this.legendSpacing = 0;
      } else if (this.showYAxisLabel && this.yAxis) {
        this.legendSpacing = 100;
      } else {
        this.legendSpacing = 40;
      }
      this.xScale = this.getXScale();
      this.yScale = this.getYScale();
  
      // line chart
      this.xDomainLine = this.getXDomainLine();
      if (this.filteredDomain) {
        this.xDomainLine = this.filteredDomain;
      }
  
      this.yDomainLine = this.getYDomainLine();
      this.seriesDomain = this.getSeriesDomain();
  
      this.xScaleLine = this.getXScaleLine(this.xDomainLine, this.dims.width);
      this.yScaleLine = this.getYScaleLine(this.yDomainLine, this.dims.height);
  
      this.setColors();
      this.legendOptions = this.getLegendOptions();
  
      this.transform = `translate(${this.dims.xOffset} , ${this.margin[0]})`;
    }
  
    deactivateAll() {
      this.activeEntries = [...this.activeEntries];
      for (const entry of this.activeEntries) {
        this.deactivate.emit({ value: entry, entries: [] });
      }
      this.activeEntries = [];
    }
  
    @HostListener('mouseleave')
    hideCircles(): void {
      this.hoveredVertical = null;
      this.deactivateAll();
    }
  
    updateHoveredVertical(item): void {
      this.hoveredVertical = item.value;
      this.deactivateAll();
    }
  
    updateDomain(domain): void {
      this.filteredDomain = domain;
      this.xDomainLine = this.filteredDomain;
      this.xScaleLine = this.getXScaleLine(this.xDomainLine, this.dims.width);
    }
  
    getSeriesDomain(): any[] {
      this.lineChart=this.lineChartSeries;
      this.combinedSeries = this.lineChart.slice(0);
      this.combinedSeries.push({
        name: this.yAxisLabel,
        series: this.results
      });
      return this.combinedSeries.map(d => d.name);
    }
  
    isDate(value): boolean {
      if (value instanceof Date) {
        return true;
      }
  
      return false;
    }
  
    getScaleType(values): string {
      let date = true;
      let num = true;
  
      for (const value of values) {
        if (!this.isDate(value)) {
          date = false;
        }
  
        if (typeof value !== 'number') {
          num = false;
        }
      }
  
      if (date) return 'time';
      if (num) return 'linear';
      return 'ordinal';
    }
  
    getXDomainLine(): any[] {
      let values = [];
  
      for (const results of this.lineChart) {
        for (const d of results.series) {
          if (!values.includes(d.name)) {
            values.push(d.name);
          }
        }
      }
  
      this.scaleType = this.getScaleType(values);
      let domain = [];
  
      if (this.scaleType === 'time') {
        const min = Math.min(...values);
        const max = Math.max(...values);
        domain = [min, max];
      } else if (this.scaleType === 'linear') {
        values = values.map(v => Number(v));
        const min = Math.min(...values);
        const max = Math.max(...values);
        domain = [min, max];
      } else {
        domain = values;
      }
  
      this.xSet = values;
      return domain;
    }
  
    getYDomainLine(): any[] {
      const domain = [];
  
      for (const results of this.lineChart) {
        for (const d of results.series) {
          if (domain.indexOf(d.value) < 0) {
            domain.push(d.value);
          }
          if (d.min !== undefined) {
            if (domain.indexOf(d.min) < 0) {
              domain.push(d.min);
            }
          }
          if (d.max !== undefined) {
            if (domain.indexOf(d.max) < 0) {
              domain.push(d.max);
            }
          }
        }
      }
  
      let min = Math.min(...domain);
      const max = Math.max(...domain);
      if (this.yRightAxisScaleFactor) {
        const minMax = this.yRightAxisScaleFactor(min, max);
        return [Math.min(0, minMax.min), minMax.max];
      } else {
        min = Math.min(0, min);
        return [min, max];
      }
    }
  
    getXScaleLine(domain, width): any {
      let scale;
      if (this.bandwidth === undefined) {
        this.bandwidth = (this.dims.width - this.barPadding);
      }
  
      if (this.scaleType === 'time') {
        scale = scaleTime()
          .range([0, width])
          .domain(domain);
      } else if (this.scaleType === 'linear') {
        scale = scaleLinear()
          .range([0, width])
          .domain(domain);
  
        if (this.roundDomains) {
          scale = scale.nice();
        }
      } else if (this.scaleType === 'ordinal') {
        scale = scalePoint()
          .range([this.bandwidth / 2, width - this.bandwidth / 2])
          .domain(domain);
      }
  
      return scale;
    }
  
    getYScaleLine(domain, height): any {
      const scale = scaleLinear()
        .range([height, 0])
        .domain(domain);
  
      return this.roundDomains ? scale.nice() : scale;
    }
  
    getXScale(): any {
      this.xDomain = this.getXDomain();
      const spacing = this.xDomain.length / (this.dims.width / this.barPadding + 1);
      return scaleBand()
        .rangeRound([0, this.dims.width])
        .paddingInner(spacing)
        .domain(this.xDomain);
    }
  
    getYScale(): any {
      this.yDomain = this.getYDomain();
      const scale = scaleLinear()
        .range([this.dims.height, 0])
        .domain(this.yDomain);
      return this.roundDomains ? scale.nice() : scale;
    }
  
    getXDomain(): any[] {
      return this.results.map(d => d.name);
    }
  
    getYDomain() {
      const values = this.results.map(d => d.value);
      const min = Math.min(0, ...values);
      const max = Math.max(...values);
      if (this.yLeftAxisScaleFactor) {
        const minMax = this.yLeftAxisScaleFactor(min, max);
        return [Math.min(0, minMax.min), minMax.max];
      } else {
        return [min, max];
      }
    }
  
    onClick(data) {
      this.select.emit(data);
    }
  
    setColors(): void {
      let domain;
      if (this.schemeType === 'ordinal') {
        domain = this.xDomain;
      } else {
        domain = this.yDomain;
      }
      this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
      this.colorsLine = new ColorHelper(this.colorSchemeLine, this.schemeType, domain, this.customColors);
    }
  
    getLegendOptions() {
      const opts = {
        scaleType: this.schemeType,
        colors: undefined,
        domain: [],
        title: undefined
      };
      if (opts.scaleType === 'ordinal') {
        opts.domain = this.seriesDomain;
        opts.colors = this.colorsLine;
        opts.title = this.legendTitle;
      } else {
        opts.domain = this.seriesDomain;
        opts.colors = this.colors.scale;
      }
      return opts;
    }
  
    updateLineWidth(width): void {
      this.bandwidth = width;
    }
  
    updateYAxisWidth({ width }): void {
      this.yAxisWidth = width + 20;
      this.update();
    }
  
    updateXAxisHeight({ height }): void {
      this.xAxisHeight = height;
      this.update();
    }
  
    onActivate(item) {
      const idx = this.activeEntries.findIndex(d => {
        return d.name === item.name && d.value === item.value && d.series === item.series;
      });
      if (idx > -1) {
        return;
      }
  
      this.activeEntries = [item, ...this.activeEntries];
      this.activate.emit({ value: item, entries: this.activeEntries });
    }
  
    onDeactivate(item) {
      const idx = this.activeEntries.findIndex(d => {
        return d.name === item.name && d.value === item.value && d.series === item.series;
      });
  
      this.activeEntries.splice(idx, 1);
      this.activeEntries = [...this.activeEntries];
  
      this.deactivate.emit({ value: item, entries: this.activeEntries });
    }
  
  }

  


