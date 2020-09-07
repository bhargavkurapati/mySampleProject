  import { Component, OnInit } from '@angular/core';
  import {TestData} from './testData';
  import * as shape from 'd3-shape';
  import { Observable } from 'rxjs/observable';
  import {GraphNode, IGraphNode} from './GraphNode';
  import {GraphLink, IGraphLink} from './GraphLink';
  import * as _ from 'underscore';
  
  @Component({
    selector: 'app-graph3',
    templateUrl: './graph3.component.html',
    styleUrls: ['./graph3.component.scss']
  })
  export class Graph3Component implements OnInit {
    hierarchialGraph = {nodes: [], links: []};
    square = shape.curveLinear;
    rawTestData;
    graphWidth: number;
    showGraph: boolean = true;
    foundLink:any;
     constructor() {
      this.rawTestData = TestData;
     }
  
    ngOnInit() {
      this.drawFullGraph();
    }
    
  
  
     extractGraphLinks(rawTestData, nodesData): Observable<IGraphLink[]> {
      return new Observable<IGraphLink[]>(observer => {
        const jumpList = rawTestData._jumpList;
        const links = [];
        const maxSourceId = nodesData.length;
        console.log(maxSourceId);
  
        nodesData.forEach((node) => {
  
          // Fist node has id === 'start', requires checking and special actions
          switch (node.id) {
            case 'start':
              jumpList.forEach((item) => {
                if (item.Targets.indexOf(1) !== 0) {
                  const firstLink = new GraphLink('start', '1', {'display': 'block'});
                  const found = links.some(function (el) {
                    return el.source === firstLink.source && el.target === firstLink.target;
                  });
                  if (!found) {
                    links.push(firstLink);
                  }
                }
              });
              break;
            // For every other link we should search next node with higher id
            default:
              jumpList.forEach((item) => {
                if (item.Targets.indexOf(parseInt(node.id, null)) !== 0) {
                  const strSource = (node.id).toString();
                  const strTarget = (parseInt(node.id, null) + 1).toString();
                  const link = new GraphLink(strSource, strTarget, {'display': 'block'});
                  const found = links.some(function (el) {
                    return el.source === link.source && el.target === link.target;
                  });
                  if (!found) {
                    // Links should not exceed max number of nodes
                    if (parseInt(link.source, null) !== maxSourceId - 1) {
                      links.push(link);
                    }
                  }
                }
              });
              break;
          }
        });
        jumpList.forEach((link) => {
          if (link.hasOwnProperty('Targets') && link.Targets.length > 1) {
            for (let i = 0; i < link.Targets.length; i++) {
              if (link.Targets[i] === 0) {
                const newLink = new GraphLink('start', (link.Targets[i + 1]).toString(), {'display': 'block'});
                links.push(newLink);
              } else if (link.Targets.length > i + 1) {
                const newLink = new GraphLink(link.Targets[i].toString(), (link.Targets[i + 1]).toString(), {'display': 'block'});
                links.push(newLink);
              }
            }
          }
        });
        observer.next(links);
      });
    }
  
  
  
    extractGraphNodes(rawTestData): Observable<IGraphNode[]> {
      return new Observable<IGraphNode[]>(observer => {
        const nodes = [];
        if (rawTestData.hasOwnProperty('_actions')) {
          const actions = rawTestData._actions;
          let id = 0;
          actions.forEach((action) => {
            const stringId = id.toString();
            const nodePosition = 'x' + stringId;
            const newNode = new GraphNode(stringId, action.InvokeTargetInfo.Name, nodePosition);
            id++;
            nodes.push(newNode);
          });
          observer.next(nodes);
        }
      });
    }
  
      drawFullGraph() {
      this.extractGraphNodes(this.rawTestData).subscribe((nodes) => {
        this.hierarchialGraph.nodes = nodes;
        console.log(nodes);
  
        this.extractGraphLinks(this.rawTestData, nodes).subscribe((links) => {
          this.hierarchialGraph.links = links;
          console.log(links);
        });
      });
    }
  
  
  
      private findLargestTargetLink(maxTarget: IGraphLink, data): Observable<object[]> {
      return new Observable<object[]>(subscriber => {
        const array = [];
        data.forEach((item: IGraphLink) => {
          if (item.target === maxTarget.target) {
            array.push(item);
          }
        });
        subscriber.next(array);
      });
    }
  
  
  
    private findLargestSourceLink(maxTarget: IGraphLink, data): Observable<object[]> {
      return new Observable<object[]>(subscriber => {
        const array = [];
        data.forEach((item: IGraphLink) => {
          if (item.target === maxTarget.source) {
            array.push(item);
          }
        });
        subscriber.next(array);
      });
    }
  
  
  
     drawShortestPath(graph) {
  
      const newLinks = [];
      const data = this.hierarchialGraph.links;
      this.foundLink = new GraphLink('', '', {'display': 'block'});
  
      if (this.hierarchialGraph.links.length > 0) {
        const maxTarget = _.max(this.hierarchialGraph.links, (link: IGraphLink) => {
          return parseInt(link.target, null);
        });
  
  
        this.findLargestTargetLink(maxTarget, data).subscribe((array) => {
          const min = _.min(array, (link) => {
            console.log(link['source']);
            return parseInt(link['source'], null);
          });
          // This will be the the first element
          newLinks.push(min);

          this.foundLink = min;
          // Until start node is not found repear search
          do {
            this.findLargestSourceLink(this.foundLink, data).subscribe((array1) => {
              const found = array1.some(function (el: IGraphLink) {
                return el.source === 'start';
              });
  
              if (found) {
                newLinks.push(array1[0]);
                this.foundLink = <IGraphLink>array1[0];
              } else {
                const min1 = _.min(array1, (link) => {
                  return parseInt(link['source'], null);
                });
                newLinks.push(min1);
                this.foundLink = min1;
              }
            });
          }
          while (this.foundLink.source !== 'start');
        });
      }
      const updatedLinks = [];
      this.hierarchialGraph.links.forEach((link) => {
        const found = newLinks.some(function (el: IGraphLink) {
          return el.source === link.source && el.target === link.target;
        });
        if (found) {
          link.stroke = {'display': 'block'};
          link.label = 'block';
          updatedLinks.push(link);
        } else {
          link.stroke = {'display': 'none'};
          link.label = 'none';
  
          updatedLinks.push(link);
        }
        this.hierarchialGraph.links.push(link);
  
      });
      console.log(updatedLinks);
      this.hierarchialGraph.links = [] ;
      this.hierarchialGraph.links = updatedLinks;
      this.showGraph = false;
      setTimeout(() => {
        this.showGraph = true
      });
    }
  
    }
  
  
  