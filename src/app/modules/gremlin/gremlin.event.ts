export class GremlinEvent {
  name;
  value;
  constructor(name: string, value?: any) {
    this.name = name;
    this.value = value;
  }
}
