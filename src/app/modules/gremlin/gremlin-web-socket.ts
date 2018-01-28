import { GremlinClientOptions } from './gremlin-client-options';
import { GremlinEvent } from './gremlin.event';
import { GremlinQuery } from './gremlin.query';
import { GremlinQueryResponse } from './gremlin.query.response';
import { Buffer } from 'buffer';

export class GremlinWebSocket {
  private _ws: WebSocket;
  private _queries: {[id: string]: GremlinQuery} = {};
  private _queue = new Array<GremlinQuery>();

  get socket() {
    return this._ws;
  }

  close() {
    this._ws.close();
  }

  get isOpen() {
    return this._ws.OPEN === this._ws.readyState;
  }

  sendMessage(gremlinQuery: GremlinQuery) {
    if (!this.isOpen) {
      this.open();
      this._queue.push(gremlinQuery);
    } else {
      this._queries[gremlinQuery.id] = gremlinQuery;
      this._ws.send(gremlinQuery.binaryFormat);
    }
  }

  /**
   * Process the current command queue, sending commands to Gremlin Server
   * (First In, First Out).
   */
  executeQueue() {
    while (this._queue.length > 0) {
      const query = this._queue.shift();
      this.sendMessage(query);
    }
  }

   /**
   * Process all incoming raw message events sent by Gremlin Server, and dispatch
   * to the appropriate command.
   *
   */
  onMessage(message) {
    let rawMessage, requestId, statusCode, statusMessage;
    try {
      const {data} = message;
      const dataBuffer = new Buffer(data, 'binary');
      rawMessage = JSON.parse(dataBuffer.toString('utf-8'));
      requestId = rawMessage.requestId;
      statusCode = rawMessage.status.code;
      statusMessage = rawMessage.status.message;
    } catch (e) {
      console.warn('MalformedResponse', 'Received malformed response message');
      return;
    }

    const gremlinResponse = new GremlinQueryResponse();
    gremlinResponse.rawMessage = rawMessage;
    gremlinResponse.requestId = requestId;
    gremlinResponse.statusCode = statusCode;
    gremlinResponse.statusMessage = statusMessage;

    // If we didn't find a waiting query for this response, emit a warning
    if (!this._queries[requestId]) {
      console.warn(
        'OrphanedResponse',
        `Received response for missing or closed request: ${requestId}`,
      );
      return;
    }

    const query = this._queries[requestId];

    switch (statusCode) {
      case 200: // SUCCESS
        delete this._queries[requestId]; // TODO: optimize performance
        query.onMessage(gremlinResponse);
        query.onMessage(null);
        break;
      case 204: // NO_CONTENT
        delete this._queries[requestId];
        query.onMessage(null);
        break;
      case 206: // PARTIAL_CONTENT
        query.onMessage(rawMessage);
        break;
      case 407: // AUTHENTICATE CHALLANGE
        // const challengeResponse = this.buildChallengeResponse(requestId);
        // this.sendMessage(challengeResponse);
        // TODO: create authentication
        console.error('requires authentication');
        break;
      default:
        delete this._queries[requestId];
          console.error(statusMessage + ' (Error ' + statusCode + ')');
        break;
    }
  }

  onOpen(evt) {
    console.log('opened connection');
    this.executeQueue();
  }

  onError(err) {
    console.log('an error occured');
    console.error(err);
  }

  buildChallengeResponse(requestId) {
    const {processor, op, accept, language, aliases} = this.options;
    const saslbase64 = new Buffer('\0' + this.options.user + '\0' + this.options.password).toString('base64');
    const args = {sasl: saslbase64}

    const message = {
      requestId: requestId,
      processor,
      op: 'authentication',
      args,
    };

    return message;
  }

  open() {
    const address = `ws${this.options.ssl ? 's' : ''}://${this.options.host}:${this.options.port}${this.options.path}`;
    this._ws = new WebSocket(address);
    this._ws.binaryType = 'arraybuffer';
    this._ws.onopen = this.onOpen;
    this._ws.onerror = this.onError;
    this._ws.onmessage = this.onMessage;
  }

  constructor(private options: GremlinClientOptions) {
    this.open();
  }
}
