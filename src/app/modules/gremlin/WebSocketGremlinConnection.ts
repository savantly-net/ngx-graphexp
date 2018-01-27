import { GremlinEvent } from './gremlin.event';
import {EventEmitter} from '@angular/core';
import * as Rx from 'rxjs/Rx';



export default class WebSocketGremlinConnection extends EventEmitter<GremlinEvent> {
  open = false;
  ws: WebSocket;

  constructor({port, host, path, ssl, rejectUnauthorized}) {
    super();

    this.open = false;

    const address = `ws${ssl ? 's' : ''}://${host}:${port}${path}`;
    const options = {
      rejectUnauthorized,
    };

    this.ws = new WebSocket(address);

    this.ws.onopen = () => this.onOpen();
    this.ws.onerror = err => this.handleError(err);
    this.ws.onmessage = message => this.handleMessage(message);
    this.ws.onclose = event => this.onClose(event);
    this.ws.binaryType = 'arraybuffer';
  }

  onOpen() {
    this.open = true;
    this.emit(new GremlinEvent('open'));
  }

  handleError(err) {
    this.emit(new GremlinEvent('error', err));
  }

  handleMessage(message) {
    this.emit(new GremlinEvent('message', message));
  }

  close() {
    this.ws.close();
  }

  onClose(event) {
    this.open = false;
    this.emit(new GremlinEvent('close', event));
  }

  sendMessage(message) {
    this.ws.send(message);
  }
}
