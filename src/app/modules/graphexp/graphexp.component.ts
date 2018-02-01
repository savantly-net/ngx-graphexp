import { GraphexpService } from './graphexp.service';
import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { GremlinService, GremlinClientOptions, GremlinQuery } from '@savantly/gremlin-js';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


enum GraphsonFormat {
  GraphSON3 = 3,
  GraphSON2 = 2
}

@Component({
  selector: 'sv-graphexp',
  templateUrl: './graphexp.component.html',
  styleUrls: ['./graphexp.component.css']
})
export class GraphexpComponent implements AfterViewInit {

  @Input()
  graphexpService: GraphexpService;
  @Input()
  COMMUNICATION_METHOD = GraphsonFormat.GraphSON3;

  public searchValue = '';
  public searchField = '';
  public graphInfoData: {};
  public nodeNames: any[] = [];
  public nodeProperties: string[];
  public edgeProperties: string[];

  ngAfterViewInit(): void {
    this.graphexpService.queryGraphInfo().then((response) => {
      this.handleGraphInfo(response.data);
    });
  }

  search(value: string, field: string) {

  }

  showNames() {
  }

  setNumberOfLayers() {
  }

  clearGraph() {

  }

  showGraphInfo() { }

  getGraphInfo() {
    this.graphexpService.queryGraphInfo().then((response) => {
      this.handleGraphInfo(response.data);
    }).catch((err) => { console.error(err) });
  }

  handleGraphInfo(data) {
    if (this.COMMUNICATION_METHOD === GraphsonFormat.GraphSON3) {
      data = this.graphson3to1(data);
    }
    this.nodeNames.length = 0;
    data[0].map((nameGroup) => {
      for (const nameItem of Object.keys(nameGroup)) {
        this.nodeNames.push({key: nameItem, value: nameGroup[nameItem]});
      }
    });
    this.graphInfoData = data;
    this.nodeProperties = this.make_properties_list(data[1][0]);
    this.edgeProperties = this.make_properties_list(data[3][0]);
    this.updateNavBar();
    this.updatePropertiesBar();
    this.updateColorChoices();
    // display_properties_bar(_node_properties,'nodes','Node properties:');
    // display_properties_bar(_edge_properties,'edges','Edge properties:');
    // display_color_choice(_node_properties,'nodes','Node color by:');
  }

  updatePropertiesBar() {}

  updateColorChoices() {}

  graphson3to1(data: any) {
    // Convert data from graphSON v2 format to graphSON v1
    if (!(Array.isArray(data) || ((typeof data === 'object') && (data !== null)) )) {
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
          if ( (typeof data_key === 'object') && (data_key !== null) ) {
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
        if ( (typeof data === 'object') && (data !== null) ) {
          data = this.graphson3to1(data);
        }
        return data;
      }
    } else if (Array.isArray(data) || ((typeof data === 'object') && (data !== null)) ) {
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
      data[key].forEach(function (item) {
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

  updateNavBar() {

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

  handleNodeClick(node) {
    // graph_viz.refresh_data(graph, center_f, active_node);
  }
  handleSearch(data) {
    // const center_f = 1;
    // graph_viz.refresh_data(graph, center_f, active_node);
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

  constructor() {}

}
