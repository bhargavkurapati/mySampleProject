import { Component, OnInit } from '@angular/core';
import * as shape from 'd3-shape';
import { Edge, Node, ClusterNode, Layout } from '@swimlane/ngx-graph';
import { nodes, clusters, links } from './data';
import { Subject } from 'rxjs';

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


@Component({
  selector: 'app-graph4',
  templateUrl: './graph4.component.html',
  styleUrls: ['./graph4.component.scss']
})
export class Graph4Component implements OnInit {

  name = 'NGX-Graph Demo';

  nodes: Node[] = nodes;
  clusters: ClusterNode[] = clusters;

  links: Edge[] = links;
  
  layout: String | Layout = 'dagreCluster';
  layouts: any[] = [
    {
      label: 'Dagre',
      value: 'dagre',
    },
    {
      label: 'Dagre Cluster',
      value: 'dagreCluster',
      isClustered: true,
    },
    {
      label: 'Cola Force Directed',
      value: 'colaForceDirected',
      isClustered: true,
    },
    {
      label: 'D3 Force Directed',
      value: 'd3ForceDirected',
    },
  ];


  // line interpolation
  curveType: string = 'Bundle';
  curve: any = shape.curveLinear;
  interpolationTypes = [
    'Bundle',
    'Cardinal',
    'Catmull Rom',
    'Linear',
    'Monotone X',
    'Monotone Y',
    'Natural',
    'Step',
    'Step After',
    'Step Before'
  ];  

  draggingEnabled: boolean = true;
  panningEnabled: boolean = true;
  zoomEnabled: boolean = true;

  zoomSpeed: number = 0.1;
  minZoomLevel: number = 0.1;
  maxZoomLevel: number = 4.0;
  panOnZoom: boolean = true;

  autoZoom: boolean = false;
  autoCenter: boolean = false; 

  update$: Subject<boolean> = new Subject();
  center$: Subject<boolean> = new Subject();
  zoomToFit$: Subject<boolean> = new Subject();

  ngOnInit() {
    this.setInterpolationType(this.curveType);
  }
   
  setInterpolationType(curveType) {
    this.curveType = curveType;
    if (curveType === 'Bundle') {
      this.curve = shape.curveBundle.beta(1);
    }
    if (curveType === 'Cardinal') {
      this.curve = shape.curveCardinal;
    }
    if (curveType === 'Catmull Rom') {
      this.curve = shape.curveCatmullRom;
    }
    if (curveType === 'Linear') {
      this.curve = shape.curveLinear;
    }
    if (curveType === 'Monotone X') {
      this.curve = shape.curveMonotoneX;
    }
    if (curveType === 'Monotone Y') {
      this.curve = shape.curveMonotoneY;
    }
    if (curveType === 'Natural') {
      this.curve = shape.curveNatural;
    }
    if (curveType === 'Step') {
      this.curve = shape.curveStep;
    }
    if (curveType === 'Step After') {
      this.curve = shape.curveStepAfter;
    }
    if (curveType === 'Step Before') {
      this.curve = shape.curveStepBefore;
    }
  }

  setLayout(layoutName: string): void {
    const layout = this.layouts.find(l => l.value === layoutName);
    this.layout = layoutName;
    if (!layout.isClustered) {
      this.clusters = undefined;
    } else {
      this.clusters = clusters;
    }
  }
}
