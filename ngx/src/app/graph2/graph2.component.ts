  import { Component, OnInit, ViewEncapsulation } from '@angular/core';
  import * as shape from 'd3-shape';
  import { colorSets } from './color-sets';
 

  @Component({
    selector: 'app-graph2',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './graph2.component.html',
    styleUrls: ['./graph2.component.scss']
  })
  export class Graph2Component implements OnInit {
    
      hierarchicalGraph = { nodes: [], links: [] };
  
      view: any[];
      width = 1000;
      height = 600;
      fitContainer = true;
      autoZoom = true;
      panOnZoom = true;
      enableZoom = true;
      autoCenter = true;
  
      sampleNodes = [
        {
          id: 'start',
          label: 'start'
        }, {
            id: '1',
            label: 'Query ThreatConnect',
            rank: 'first'
        }, {
            id: '2',
            label: 'Query XForce',
            rank: 'first'
        }, {
            id: '3',
            label: 'Format Results'
        }, {
            id: '4',
            label: 'Search Splunk'
        }, {
            id: '5',
            label: 'Block LDAP'
        }, {
            id: '6',
            label: 'Email Results'
        }];
  
      sampleLinks = [{
          source: 'start',
          target: '1'
      }, {
          source: 'start',
          target: '2'
      }, {
          source: '1',
          target: '3'
      }, {
          source: '2',
          target: '4'
      }, {
          source: '2',
          target: '6'
      }, {
          source: '3',
          target: '5'
      }];
  
      // options
      showLegend = true;
      orientation = 'LR'; // LR, RL, TB, BT
      orientations: any[] = [
          {
              label: 'Left to Right',
              value: 'LR'
          },
          {
              label: 'Right to Left',
              value: 'RL'
          },
          {
              label: 'Top to Bottom',
              value: 'TB'
          },
          {
              label: 'Bottom to Top',
              value: 'BT'
          }
      ];
  
      // line interpolation
      curveType = 'Linear';
      curve = shape.curveBundle.beta(1);
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
  
      colorSchemes: any;
      colorScheme: any;
      schemeType = 'ordinal';
      selectedColorScheme: string;
  
      constructor() {
          Object.assign(this, {
              colorSchemes: colorSets,
          });
  
          this.setColorScheme('picnic');
          this.setInterpolationType('Bundle');
      }
  
      ngOnInit() {
          this.hierarchicalGraph.nodes = this.sampleNodes;
          this.hierarchicalGraph.links = this.sampleLinks;
  
          if (!this.fitContainer) {
              this.applyDimensions();
          }
      }
  
      applyDimensions() {
          this.view = [this.width, this.height];
      }
  
      toggleEnableZoom(enableZoom: boolean) {
          this.enableZoom = enableZoom;
      }
  
      toggleFitContainer(fitContainer: boolean, autoZoom: boolean, autoCenter: boolean): void {
          this.fitContainer = fitContainer;
          this.autoZoom = autoZoom;
          this.autoCenter = autoCenter;
  
          if (this.fitContainer) {
              this.view = undefined;
          } else {
              this.applyDimensions();
          }
      }
  
      select(data) {
          console.log('Item clicked', data);
      }
  
      setColorScheme(name) {
          this.selectedColorScheme = name;
          this.colorScheme = this.colorSchemes.find(s => s.name === name);
      }
  
      setInterpolationType(curveType) {
          this.curveType = curveType;
          if (curveType === 'Bundle') {
              this.curve = shape.curveBundle.beta(1);
          }
          // if (curveType === 'Cardinal') {
          //     // d3.curveCardinal.tension(0.5)
          //     this.curve = shape.curveCardinal.tension(1);
          // }
          // if (curveType === 'Catmull Rom') {
          //     this.curve = shape.curveCatmullRom;
          // }
          // if (curveType === 'Linear') {
          //     this.curve = shape.curveLinear;
          // }
          // if (curveType === 'Monotone X') {
          //     this.curve = shape.curveMonotoneX;
          // }
          // if (curveType === 'Monotone Y') {
          //     this.curve = shape.curveMonotoneY;
          // }
          // if (curveType === 'Natural') {
          //     this.curve = shape.curveNatural;
          // }
          // if (curveType === 'Step') {
          //     this.curve = shape.curveStep;
          // }
          // if (curveType === 'Step After') {
          //     this.curve = shape.curveStepAfter;
          // }
          // if (curveType === 'Step Before') {
          //     this.curve = shape.curveStepBefore;
          // }
      }
  
      onLegendLabelClick(entry) {
          console.log('Legend clicked', entry);
      }
  
      toggleExpand(node) {
          console.log('toggle expand', node);
      }
  
      updateChart() {
          // this.update$.next(true);
      }
  
      zoomToFit() {
          // this.zoomToFit$.next(true);
      }
  
      center() {
          // this.center$.next(true);
      }
  }
  