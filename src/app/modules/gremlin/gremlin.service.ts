import { Injectable } from '@angular/core';

import * as _ from 'lodash';

import { GremlinWebSocket } from './gremlin-web-socket';
import { GremlinClientOptions } from './gremlin-client-options';
import { GremlinEvent } from './gremlin.event';
import { GremlinQuery } from './gremlin.query';
import { GremlinQueryResponse } from './gremlin.query.response';
import { Guid } from './guid';

@Injectable()
export class GremlinService {
  options: GremlinClientOptions;
  connection: GremlinWebSocket;
  commands = {};
  queue = [];
  sessionId = Guid.random();

  createConnection(options: GremlinClientOptions) {
    this.options = options;
    this.connection = new GremlinWebSocket(options);

    return this.connection;
  }

  closeConnection() {
    this.connection.close();
  }


  /**
   * Clear the queue after the connection is opened
   */
  onConnectionOpen() {
    this.executeQueue();
  }

  /**
   * Process the current command queue, sending commands to Gremlin Server
   * (First In, First Out).
   */
  executeQueue() {
    while (this.queue.length > 0) {
      const {message} = this.queue.shift();
      this.sendMessage(message);
    }
  }

  cancelPendingCommands({message, details}) {
    const commands = this.commands;
    let command;
    const error = new Error(message);
    (<any>error).details = details;

    // Empty queue
    this.queue.length = 0;
    this.commands = {};

    Object.keys(commands).forEach(key => {
      command = commands[key];
      command.messageStream.emit('error', error);
    });
  }

  sendMessage(message: string, callback?: (response: GremlinQueryResponse) => void) {
    const query = new GremlinQuery(message, this.options);
    query.onMessage = callback;
    this.connection.sendMessage(query);
  }


/*
  traversalSource() {
    const {g} = grem;

    let chain = g;

    const awaitable = new Proxy(g, {
      get: (traversal, name, receiver) => {
        if (name === 'toPromise') {
          return () =>
            new Promise((resolve, reject) => {
              const {query, params} = renderChain(chain);
              this.execute(query, params, (err, result) => {
                if (err) {
                  return reject(err);
                }
                resolve(result);
              });
            });
        }

        chain = chain[name];

        return new Proxy(traversal, {
          get(target2, name2, receiver2) {
            target2 = target2[name];
            return awaitable;
          },
        })[name];
      },
      apply(traversal, thisArg, args) {
        Reflect.apply(chain, null, args);

        return awaitable;
      },
    });

    return awaitable;
  }
*/

  constructor() { }
}
