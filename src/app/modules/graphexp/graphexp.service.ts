import {Injectable} from '@angular/core';
import {GremlinService, GremlinClientOptions, GremlinQuery, GremlinQueryResponse} from '@savantly/gremlin-js';

@Injectable()
export class GraphexpService {

  private gremlinService: GremlinService;
  node_limit_per_request = 50;

  isInt(value) {
    return !isNaN(value) &&
           !isNaN(parseInt(value, 10));
  }

  queryGraphInfo(): Promise<GremlinQueryResponse> {
    const gremlin_query_nodes = 'nodes = g.V().groupCount().by(label);';
    const gremlin_query_edges = 'edges = g.E().groupCount().by(label);';
    const gremlin_query_nodes_prop = 'nodesprop = g.V().valueMap().select(keys).groupCount();';
    const gremlin_query_edges_prop = 'edgesprop = g.E().valueMap().select(keys).groupCount();';

    const gremlinQuery = gremlin_query_nodes + gremlin_query_nodes_prop
      + gremlin_query_edges + gremlin_query_edges_prop
      + '[nodes.toList(),nodesprop.toList(),edges.toList(),edgesprop.toList()]';
    return this.executeQuery(gremlinQuery);
  }

  queryNodes(field: string, value: string): Promise<GremlinQueryResponse> {
    const input_string = value;
    const input_field = field;
    let filtered_string = input_string; // You may add .replace(/\W+/g, ''); to refuse any character not in the alphabet
    if (filtered_string.length > 50) {
      filtered_string = filtered_string.substring(0, 50); // limit string length
    }
    // Translate to Gremlin query
    let gremlin_query_nodes = null;
    let gremlin_query_edges = null;
    let gremlin_query = null;
    if (input_string === '') {
      gremlin_query_nodes = `nodes = g.V().limit(${this.node_limit_per_request})`;
      gremlin_query_edges =
        `edges = g.V().limit(${this.node_limit_per_request}).aggregate('node').outE().as('edge').inV().where(within('node')).select('edge')`;
      gremlin_query = gremlin_query_nodes + '\n' + gremlin_query_edges + '\n' + '[nodes.toList(),edges.toList()]';

    } else {
      let has_str = `has('${input_field}', '${filtered_string})'`;
      if (this.isInt(input_string)) {
        has_str = `has('${input_field}', ${filtered_string})`;
      }
      gremlin_query = 'g.V().' + has_str;
      gremlin_query_nodes = 'nodes = g.V().' + has_str;
      gremlin_query_edges = 'edges = g.V().' + has_str
        + `.aggregate('node').outE().as('edge').inV().where(within('node')).select('edge')`;
      gremlin_query = gremlin_query_nodes + '\n' + gremlin_query_edges + '\n' + '[nodes.toList(),edges.toList()]'
      console.log(gremlin_query);
      return this.executeQuery(gremlin_query);
    }
  }

  getRelatedNodes(d: any) {
    let id = d.id;
    if (isNaN(id)) {
      id = `'${id}'`;
    }
    const gremlin_query_nodes = `nodes = g.V(${id}).as('node').both().as('node').select(all,'node').inject(g.V(${id})).unfold()`;
    const gremlin_query_edges = `edges = g.V(${id}).bothE()`;
    const gremlin_query = gremlin_query_nodes + `\n'+gremlin_query_edges+'\n'+'[nodes.toList(),edges.toList()]`;
    return this.executeQuery(gremlin_query);
  }

  public executeQuery(gremlin: string, bindings?: {}): Promise<GremlinQueryResponse> {
    const promise = new Promise<GremlinQueryResponse>((resolve, reject) => {
      const query = this.gremlinService.createQuery(gremlin, bindings);
      query.onComplete = (response) => {
        resolve(response);
      };
      this.gremlinService.sendMessage(query);
    });
    return promise;
  }

  constructor(options: any) {
    this.gremlinService = new GremlinService(options);
  }

}
