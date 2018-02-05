
export class D3Node {

  fx?: number;
  fy?: number;
  id: any;
  index?: number;
  label?: string;
  properties: any = {};
  source?: D3Node;
  target?: D3Node;
  type: string;
  vx?: number;
  vy?: number;
  x: number;
  y: number;
  value: any;

  addProperty(key: string, value: any) {
    this.properties[key] =  value;
  }

  removeProperty(key: string) {
    delete this.properties[key];
  }

  constructor(options?: any) {
    Object.assign(this, options);
  }

}
