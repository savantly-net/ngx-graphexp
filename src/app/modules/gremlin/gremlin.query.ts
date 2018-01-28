import {GremlinClientOptions} from './gremlin-client-options';
import { GremlinQueryResponse } from './gremlin.query.response';
import { Guid } from './guid';
export class GremlinQuery {
  id = Guid.random();
  onComplete: (data: GremlinQueryResponse) => any;

  onMessage (data: GremlinQueryResponse) {
    console.log(data);
  }

   /**
   * returns a binary format ready for web-socket transfer
   */
  get binaryFormat() {
    let serializedMessage = this.jsonFormat;
    serializedMessage = decodeURI(encodeURIComponent(serializedMessage));

    // Let's start packing the message into binary
    // mimeLength(1) + mimeType Length + serializedMessage Length
    const binaryMessage = new Uint8Array(1 + serializedMessage.length);
    binaryMessage[0] = this.options.accept.length;

    for (let i = 0; i < serializedMessage.length; i++) {
      binaryMessage[i + 1] = serializedMessage.charCodeAt(i);
    }

    return binaryMessage;
  }

  /**
   * returns a serialized json message ready for transfer
   */
  get jsonFormat() {
    const msg = {
      'requestId': this.id,
      'op': this.options.processor,
      'processor': this.options.processor,
      'args': {
        'gremlin': this.rawQuery,
        'bindings': {}, // TODO: parse raw query into bindings
        'language': this.options.language
      }
    }
    const serializedMessage = this.options.accept + JSON.stringify(msg);
    return serializedMessage;
  }

  constructor(private rawQuery: string, private options: GremlinClientOptions) {}

}
