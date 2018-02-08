import { D3Node } from '../nodes/d3Node';

export class ConnectionCreatedEvent {
  source: D3Node;
  target: D3Node;
}
