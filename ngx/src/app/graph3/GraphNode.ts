export interface IGraphNode {
    id: string;
    label: string;
    position: string;
  }
  
  export class GraphNode {
    id: string;
    label: string;
    position: string;
  
    constructor(id: string, label: string, position: string) {
      this.id = id;
      this.label = label;
      this.position = position;
  
      if (this.id === '0') {
        this.id = 'start';
        this.position = 'x0';
      }
    }
  }
  