export class TinkerNode {

  id: string;
  label: string;
  type: string;
  inVLabel: string;
  outVLabel: string;
  inV: number;
  outV: number;

  constructor(options?: any) {
    Object.assign(this, options);
  }

}
