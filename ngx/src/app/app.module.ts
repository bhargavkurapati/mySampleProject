import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
 import { NvD3Module } from 'ng2-nvd3';
 import 'nvd3';

//  import {MaterialModule} from './material.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts'; 
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { HeatMapsComponent } from './heat-maps/heat-maps.component';
import { CustomChartsComponent } from './custom-charts/custom-charts.component';
import { PieChartGridComponent } from './pie-chart-grid/pie-chart-grid.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { PieChartAdvancedComponent } from './pie-chart-advanced/pie-chart-advanced.component';
import { AreaChartsComponent } from './area-charts/area-charts.component';
import { AreaChartsStackedComponent } from './area-charts-stacked/area-charts-stacked.component';
import { NormlizdAreaChartComponent } from './normlizd-area-chart/normlizd-area-chart.component';
import { BubleChartComponent } from './buble-chart/buble-chart.component';
import { TreeChartComponent } from './tree-chart/tree-chart.component';
import { LinearGaugeChartComponent } from './linear-gauge-chart/linear-gauge-chart.component';
import { GuageChartComponent } from './guage-chart/guage-chart.component';
import { PolarChartComponent } from './polar-chart/polar-chart.component';
import { NumberChartComponent } from './number-chart/number-chart.component';
import { BarChartHorizontalComponent } from './bar-chart-horizontal/bar-chart-horizontal.component';
import { BarChartHorizontalGroupedComponent } from './bar-chart-horizontal-grouped/bar-chart-horizontal-grouped.component';
import { ComboChartsComponent } from './combo-charts/combo-charts.component';
import { HeatChartCalenderComponent } from './heat-chart-calender/heat-chart-calender.component';
// import { DynamicFormsComponent } from './dynamic-forms/dynamic-forms.component';

import {Nvd3Component} from './NVD3-charts/nvd3/nvd3.component';
import { Nvd3SineCosComponent } from './NVD3-charts/nvd3-sine-cos/nvd3-sine-cos.component';
import { DonutchartComponent } from './donutchart/donutchart.component';
import { Graph1Component } from './graph1/graph1.component';
import { Graph2Component } from './graph2/graph2.component';
import { Graph3Component } from './graph3/graph3.component';
import { Graph4Component } from './graph4/graph4.component'; 

// Mat
import {DragDropModule} from "@angular/cdk/drag-drop";
import {ScrollingModule} from "@angular/cdk/scrolling";
import {CdkTableModule} from "@angular/cdk/table";
import {CdkTreeModule} from "@angular/cdk/tree";
import {A11yModule} from "@angular/cdk/a11y";
import {MatAutocompleteModule} from "@angular/material/autocomplete";

 import {MatBadgeModule} from "@angular/material/badge";
 import {MatBottomSheetModule} from "@angular/material/bottom-sheet";
 import {MatButtonModule} from "@angular/material/button";
 import {MatButtonToggleModule} from "@angular/material/button-toggle";
 import {MatCardModule} from "@angular/material/card";
 import {MatCheckboxModule} from "@angular/material/checkbox";
 import {MatChipsModule} from "@angular/material/chips";
 import {MatDatepickerModule} from "@angular/material/datepicker";
 import {MatDialogModule} from "@angular/material/dialog";
 import {MatDividerModule} from "@angular/material/divider";
 import {MatExpansionModule} from "@angular/material/expansion";
 import {MatGridListModule} from "@angular/material/grid-list";
 import {MatIconModule} from "@angular/material/icon";
 import {MatInputModule} from "@angular/material/input";
 import {MatListModule} from "@angular/material/list";
 import {MatMenuModule} from "@angular/material/menu";
//  import {MatNativeDateModule} from "@angular/material/";
 import {MatPaginatorModule} from "@angular/material/paginator";
 import {MatProgressBarModule} from "@angular/material/progress-bar";
 import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
 import {MatRadioModule} from "@angular/material/radio";
//  import {MatRippleModule} from "@angular/material";
 import {MatSelectModule} from "@angular/material/select";
 import {MatSidenavModule} from "@angular/material/sidenav";
 import {MatSliderModule} from "@angular/material/slider";
 import {MatSlideToggleModule} from "@angular/material/slide-toggle";
 import {MatSnackBarModule} from "@angular/material/snack-bar";
 import {MatSortModule} from "@angular/material/sort";
 import {MatStepperModule} from "@angular/material/stepper";
 import {MatTableModule} from "@angular/material/table";
 import {MatTabsModule} from "@angular/material/tabs";
 import {MatToolbarModule} from "@angular/material/toolbar";
 import {MatTooltipModule} from "@angular/material/tooltip";
 import {MatTreeModule} from "@angular/material/tree";






@NgModule({
  declarations: [
    AppComponent,
    HeatMapsComponent,
    CustomChartsComponent,
    PieChartGridComponent,
    PieChartComponent,
    PieChartAdvancedComponent,
    AreaChartsComponent,
    AreaChartsStackedComponent,
    NormlizdAreaChartComponent,
    BubleChartComponent,
    TreeChartComponent,
    LinearGaugeChartComponent,
    GuageChartComponent,
    PolarChartComponent,
    NumberChartComponent,
    BarChartHorizontalComponent,
    BarChartHorizontalGroupedComponent,
    ComboChartsComponent,
    HeatChartCalenderComponent,
    Nvd3Component,
    Nvd3SineCosComponent,
    DonutchartComponent,
    Graph1Component,
    Graph2Component,
    Graph3Component,
    Graph4Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxChartsModule,
    NgxGraphModule,
    BrowserAnimationsModule,
    FormsModule, 
    ReactiveFormsModule,
    NvD3Module,
    // MaterialModule
    DragDropModule,
    ScrollingModule,CdkTableModule,CdkTreeModule,A11yModule,
    MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  // MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  // MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }