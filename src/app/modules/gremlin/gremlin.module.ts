import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GremlinService } from './gremlin.service';
import { GremlinClientOptions } from './gremlin-client-options';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [ GremlinService ]
})
export class GremlinModule {


  /**
   * Given a map of functions returning query objects, returns a map
   * of function promising execution of these queries with the given Gremlin
   * client.
   *
   */
//  bindForClient(client, functions) {
//    _(functions)
//      .mapValues(fn => (...args) => makePromise(client, fn(...args)))
//      .value();
//  }

  constructor () {}

}
