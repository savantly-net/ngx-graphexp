export class GremlinPromise extends Promise<any> {
  public query: any;

  constructor(fn: (resolve, reject) => void) {
    super(fn);
  }
}
