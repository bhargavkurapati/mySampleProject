export interface IGraphLink {
    source: string;
    target: string;
    stroke: object;
  }
  
  export class GraphLink {
    source: string;
    target: string;
    stroke: object;
  
    constructor(source: string, target: string, stroke: object) {
      this.source = source;
      this.target = target;
      this.stroke = stroke;
    }
  }
  