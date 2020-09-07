import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
 import { NvD3Module } from 'ng2-nvd3';
 import 'nvd3';
import { SinAndCosComponent } from './sin-and-cos/sin-and-cos.component';
import { CumulativeLineChartComponent } from './cumulative-line-chart/cumulative-line-chart.component';
import { StackedAreaChartComponent } from './stacked-area-chart/stacked-area-chart.component';
import { MultibarChartComponent } from './multibar-chart/multibar-chart.component';
import { ScatterChartComponent } from './scatter-chart/scatter-chart.component';
import { DiscreteBarChartComponent } from './discrete-bar-chart/discrete-bar-chart.component';
import { HistoricalBarChartComponent } from './historical-bar-chart/historical-bar-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { ScatterPlusLineChartComponent } from './scatter-plus-line-chart/scatter-plus-line-chart.component';
import { LinePlusBarComponent } from './line-plus-bar/line-plus-bar.component';
import { LinePlusbarFocusComponent } from './line-plusbar-focus/line-plusbar-focus.component';
import { BulletChartComponent } from './bullet-chart/bullet-chart.component';
import { DonutChartComponent } from './donut-chart/donut-chart.component';
import { ParallelCoordinatesComponent } from './parallel-coordinates/parallel-coordinates.component';
import { LineFishEyeComponent } from './line-fish-eye/line-fish-eye.component';


// d3 and nvd3 should be included somewhere
// import 'd3';
// import 'nvd3';

@NgModule({
  declarations: [
    AppComponent,
    SinAndCosComponent,
    CumulativeLineChartComponent,
    StackedAreaChartComponent,
    MultibarChartComponent,
    ScatterChartComponent,
    DiscreteBarChartComponent,
    HistoricalBarChartComponent,
    PieChartComponent,
    ScatterPlusLineChartComponent,
    LinePlusBarComponent,
    LinePlusbarFocusComponent,
    BulletChartComponent,
    DonutChartComponent,
    ParallelCoordinatesComponent,
    LineFishEyeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,NvD3Module
  
  ], 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
