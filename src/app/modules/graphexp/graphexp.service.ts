import {Injectable} from '@angular/core';
import {GremlinService, GremlinClientOptions, GremlinQuery, GremlinQueryResponse} from '@savantly/gremlin-js';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

export enum GraphsonFormat {
  GraphSON3 = 3,
  GraphSON2 = 2
}

@Injectable()
export class GraphexpService {

  private gremlinService: GremlinService;
  public COMMUNICATION_METHOD: GraphsonFormat = GraphsonFormat.GraphSON3;
  public graphInfoData = new BehaviorSubject<any>({});
  public nodeNames = new BehaviorSubject<string[]>([]);
  public nodeProperties = new BehaviorSubject<string[]>([]);
  public edgeProperties = new BehaviorSubject<string[]>([]);
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

  handleGraphInfo(data) {
    if (this.COMMUNICATION_METHOD === GraphsonFormat.GraphSON3) {
      data = this.graphson3to1(data);
    }
    const nodeNames = [];
    data[0].map((nameGroup) => {
      for (const nameItem of Object.keys(nameGroup)) {
        nodeNames.push({key: nameItem, value: nameGroup[nameItem]});
      }
    });
    this.nodeNames.next([]);
    this.graphInfoData.next(data);
    this.nodeProperties.next(this.make_properties_list(data[1][0]));
    this.edgeProperties.next(this.make_properties_list(data[3][0]));
  }

  make_properties_list(data: {}) {
    const prop_dic = {};
    for (let prop_str of Object.keys(data)) {
      prop_str = prop_str.replace(/[\[\ \"\'\]]/g, ''); // get rid of symbols [,",',] and spaces
      const prop_list = prop_str.split(',');
      for (let prop_idx = 0; prop_idx < prop_list.length; prop_idx++) {
        prop_dic[prop_list[prop_idx]] = 0;
      }
    }
    const properties_list = [];
    for (const key of Object.getOwnPropertyNames(prop_dic)) {
      properties_list.push(key);
    }
    return properties_list;
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
  graphson3to1(data: any) {
    // Convert data from graphSON v2 format to graphSON v1
    if (!(Array.isArray(data) || ((typeof data === 'object') && (data !== null)))) {
      return data;
    }
    if ('@type' in data) {
      if (data['@type'] === 'g:List') {
        data = data['@value'];
        return this.graphson3to1(data);
      } else if (data['@type'] === 'g:Set') {
        data = data['@value'];
        return data;
      } else if (data['@type'] === 'g:Map') {
        const data_tmp = {}
        for (let i = 0; i < data['@value'].length; i += 2) {
          let data_key = data['@value'][i];
          if ((typeof data_key === 'object') && (data_key !== null)) {
            data_key = this.graphson3to1(data_key);
          }
          if (Array.isArray(data_key)) {
            data_key = JSON.stringify(data_key).replace(/\'/g, ' ');
          }
          data_tmp[data_key] = this.graphson3to1(data['@value'][i + 1]);
        }
        data = data_tmp;
        return data;
      } else {
        data = data['@value'];
        if ((typeof data === 'object') && (data !== null)) {
          data = this.graphson3to1(data);
        }
        return data;
      }
    } else if (Array.isArray(data) || ((typeof data === 'object') && (data !== null))) {
      for (const key of Object.keys(data)) {
        data[key] = this.graphson3to1(data[key]);
      }
      return data;
    }
    return data;
  }
  arrangeData(data) {
    if (this.COMMUNICATION_METHOD === GraphsonFormat.GraphSON3) {
      data = this.graphson3to1(data);
      return this.arrange_datav3(data);
    } else {
      return this.arrange_datav2(data);
    }
  }

  arrange_datav3(data): {nodes: any[], links: any[]} {
    // Extract node and edges from the data returned for 'search' and 'click' request
    // Create the graph object
    const nodes = [], links = [];
    for (const key of Object.keys(data)) {
      data[key].forEach((item) => {
        if (!('inV' in item) && this.idIndex(nodes, item.id) == null) { // if vertex and not already in the list
          item.type = 'vertex';
          nodes.push(this.extract_infov3(item));
        }
        if (('inV' in item) && this.idIndex(links, item.id) == null) {
          item.type = 'edge';
          links.push(this.extract_infov3(item));
        }
      });
    }
    return {nodes: nodes, links: links};
  }
  arrange_datav2(data: any): {nodes: any[], links: any[]} {
    // Extract node and edges from the data returned for 'search' and 'click' request
    // Create the graph object
    const nodes = [], links = [];
    for (const key of Object.keys(data)) {
      data[key].forEach(function(item) {
        if (item.type === 'vertex' && this.idIndex(nodes, item.id) === null) { // if vertex and not already in the list
          nodes.push(this.extract_infov2(item));
        }

        if (item.type === 'edge' && this.idIndex(links, item.id) == null) {
          links.push(this.extract_infov2(item));
        }
      });
    }
    return {nodes: nodes, links: links};
  }

  extract_infov2(data) {
    const data_dic = {id: data.id, label: data.label, type: data.type, properties: {}, source: null, target: null};
    const prop_dic = data.properties;
    for (const key in prop_dic) {
      if (prop_dic.hasOwnProperty(key)) {
        data_dic.properties[key] = prop_dic[key];
      }
    }
    if (data.type === 'edge') {
      data_dic.source = data.outV;
      data_dic.target = data.inV;
    }
    return data_dic;
  }

  extract_infov3(data) {
    const data_dic = {id: data.id, label: data.label, type: data.type, properties: {}, source: null, target: null};
    const prop_dic = data.properties;
    for (const key in prop_dic) {
      if (prop_dic.hasOwnProperty(key)) {
        let property = null;
        if (data.type === 'vertex') {// Extracting the Vertexproperties (properties of properties for vertices)
          property = prop_dic[key];
          property['summary'] = this.get_vertex_prop_in_list(prop_dic[key]).toString();
        } else {
          property = prop_dic[key]['value'];
        }
        data_dic.properties[key] = property;
      }
    }
    if (data.type === 'edge') {
      data_dic.source = data.outV
      data_dic.target = data.inV
    }
    return data_dic
  }
  get_vertex_prop_in_list(vertexProperty): any {
    const prop_value_list = [];
    for (const key of Object.keys(vertexProperty)) {
      prop_value_list.push(vertexProperty[key]['value']);
    }
    return prop_value_list;
  }

  idIndex(list, elem) {
    // find the element in list with id equal to elem
    // return its index or null if there is no
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === elem) {
        return i;
      }
    }
    return null;
  }

  updateSelection(data) {

  }

  constructor(options: any) {
    this.gremlinService = new GremlinService(options);
  }

}
