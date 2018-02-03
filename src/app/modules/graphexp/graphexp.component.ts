import { GraphexpService, GraphsonFormat } from './graphexp.service';
import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { GremlinService, GremlinClientOptions, GremlinQuery } from '@savantly/gremlin-js';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as d3 from 'd3';


@Component({
  selector: 'sv-graphexp',
  templateUrl: './graphexp.component.html',
  styleUrls: ['./graphexp.component.css']
})
export class GraphexpComponent implements AfterViewInit {

  @Input()
  graphexpService: GraphexpService;

  public searchValue = '';
  public searchField = '';
  public graphInfoData: {};
  public nodeNames: any[] = [];
  public nodeProperties: string[];
  public edgeProperties: string[];
  public numberOfLayers = 3;

  ngAfterViewInit(): void {
    this.graphexpService.queryGraphInfo();
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
    this.graphexpService.queryGraphInfo();
  }

  updatePropertiesBar() {}

  updateColorChoices() {}

  updateNavBar() {

  }


  handleNodeClick(node) {
    // graph_viz.refresh_data(graph, center_f, active_node);
  }
  handleSearch(data) {
    // const center_f = 1;
    // graph_viz.refresh_data(graph, center_f, active_node);
  }


colorize(value) {
  this.graphexpService.colorize(value);

}

display_prop(prop) {
  const prop_id = prop.id;
  const prop_id_nb = prop.getAttribute('id_nb');
  const text_base_offset = 10;
  const text_offset = 10;
  const prop_name = prop_id.slice(prop_id.indexOf('_') + 1);
  const item = prop_id.slice(0, prop_id.indexOf('_'));
  console.log(prop_id, item)
  if (d3.select('#' + prop_id).property('checked')) {
    let elements_text;
    if (item === 'nodes') {
      elements_text = d3.selectAll('.node');
    } else if (item === 'edges') {
      elements_text = d3.selectAll('.edgelabel');
    }
    this.attach_property(elements_text, prop_name, prop_id_nb, item);
  } else {
    if (item === 'nodes') {
      d3.selectAll('.node').select('.' + prop_id).remove();
    } else if (item === 'edges') {
      d3.selectAll('.edgelabel').select('.' + prop_id).remove();
    }

  }
}


attach_property(graph_objects, prop_name, prop_id_nb, item) {
  let elements_text;
  const text_base_offset = 10;
  const text_offset = 10;
  const prop_id = item + '_' + prop_name;
  if (item === 'nodes') {
    elements_text = graph_objects.append('text').style('pointer-events', 'none');
  } else if (item === 'edges') {
    elements_text = graph_objects.append('textPath')
    .attr('class', 'edge_text')
    .attr('href', function (d, i) {return '#edgepath' + d.id})
    .style('text-anchor', 'middle')
    .style('pointer-events', 'none')
    .attr('startOffset', '70%');
    prop_id_nb = prop_id_nb + 1;
  } else {
    console.log('Bad item name.'); return 1;
  }
  elements_text.classed('prop_details', true).classed(prop_id, true)
      .attr('dy', (d) => {return graphShapes.node_size(d) + text_base_offset + text_offset * parseInt(prop_id_nb, 10); })
      // .attr("y", ".31em")
    .text(function(d) {return get_prop_value(d, prop_name, item); });
  }


get_prop_value(d, prop_name, item) {
  if (prop_name in d.properties) {
    if (item === 'nodes') {
      if (COMMUNICATION_METHOD === 'GraphSON3') {
        return d.properties[prop_name]['summary'];
      } else if (COMMUNICATION_METHOD === 'GraphSON1') {
        return d.properties[prop_name][0].value;
      }
    } else if (item === 'edges') {
      console.log(d.properties[prop_name])
      return d.properties[prop_name];
    }
  } else {
    return '';
  }
}


set_nb_layers() {
  const nb_layers = parseInt(this.numberOfLayers, 10);
  graph_viz.layers.set_nb_layers(nb_layers);

}



  constructor() {}

}
