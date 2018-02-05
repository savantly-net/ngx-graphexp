import {GraphLayers} from './graphLayers';
import {GraphShapes} from './graphShapes';
import {GraphexpService, GraphsonFormat, ArrangedGraphData} from '../graphexp.service';
import {GraphLinks} from './graphLinks';
import {GraphNodes} from './graphNodes';
import * as d3 from 'd3';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

export class GraphViz {

  private _graphRoot: any;
  private _graphWidth = 0;
  private _graphHeight = 0;
  private _simulation: any = {};
  private force_strength = -600;
  private link_strength = 0.2;
  private force_x_strength = 0.1;
  private force_y_strength = 0.1;
  private _graphLayers: GraphLayers;
  private graphShapes: GraphShapes;
  private graphNodes: GraphNodes;
  private graphLinks: GraphLinks;

  public selectedNode: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  get simulation() {
    return this._simulation;
  }

  get graphRoot() {
    return this._graphRoot;
  }

  get nodeModels() {
    return this._graphLayers.nodes;
  }

  get graphLayers() {
    return this._graphLayers;
  }

  get linkModels() {
    return this._graphLayers._Links;
  }


  ///////////////////////////////////////
  // Remove force layout and data
  clear() {
    console.log(this._simulation)
    if (Object.keys(this._simulation).length !== 0) {
      this._simulation.stop();
      this._simulation.nodes([]);
      this._simulation.force('link').links([]);
    }
    this._graphRoot.selectAll('*').remove();
    this.nodeModels.length = 0, this.linkModels.length = 0;
    this._graphLayers.clear_old();
    this._simulation = {};
  }


  addzoom(svg) {
    // Add zoom to the svg object
    svg.append('rect')
      .attr('width', this._graphWidth).attr('height', this._graphHeight)
      .style('fill', 'none').style('pointer-events', 'all')
      .call(d3.zoom().scaleExtent([1 / 2, 4]).on('zoom', () => {
        this._graphRoot.attr('transform', d3.event.transform);
      }));
    return svg.append('g');
  }

  simulation_start(center_f) {
    let force_x, force_y;
    this.
      // Define the force applied to the nodes
      _simulation = d3.forceSimulation()
        .force('charge', d3.forceManyBody().strength(this.force_strength))
        .force('link', d3.forceLink().strength(this.link_strength).id((d) => {
          return d.id;
        }));

    if (center_f === 1) {
      force_y = this.force_x_strength;
      force_x = this.force_y_strength;
      this._simulation.force('center', d3.forceCenter(this._graphWidth / 2, this._graphHeight / 2));
    } else {
      force_y = 0;
      force_x = 0;
    }
    this._simulation.force('y', d3.forceY().strength((d) => {
      return force_y;
    }))
      .force('x', d3.forceX().strength((d) => {
        return force_x;
      }));
    return this._simulation;
  }



  //////////////////////////////////////
  refresh_data(arrangedData: ArrangedGraphData, center_f, with_active_node) {
    // Main visualization function
    const svg_graph = this.graphRoot;
    this._graphLayers.push_layers();
    this._graphLayers.update_data(arrangedData);

    this.graphLinks.update(arrangedData);

    this.graphNodes.update(arrangedData);

    //////////////////////////////////
    // Additional clean up
    this.graphShapes.decorate_old_elements(this._graphLayers.depth());
    svg_graph.selectAll('g').filter('.pinned').moveToFront();


    this._graphLayers.remove_duplicates('.active_node', '.old_node');
    this._graphLayers.remove_duplicates('.active_edge', '.old_edge');
    this._graphLayers.remove_duplicates('.active_edgepath', '.old_edgepath');
    this._graphLayers.remove_duplicates('.active_edgelabel', '.old_edgelabel');


    // Force simulation simulation model and paramers Associate the simulation with the data
    this._simulation = this.simulation_start(center_f);
    this._simulation.nodes(this.nodeModels).on('tick', () => {
      this.graphNodes.tick();
      this.graphLinks.tick();
    });
    this._simulation.force('link').links(this.linkModels);
    this._simulation.alphaTarget(0);

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
        .attr('href', function(d, i) {return '#edgepath' + d.id})
        .style('text-anchor', 'middle')
        .style('pointer-events', 'none')
        .attr('startOffset', '70%');
      prop_id_nb = prop_id_nb + 1;
    } else {
      console.log('Bad item name.'); return 1;
    }
    elements_text.classed('prop_details', true).classed(prop_id, true)
      .attr('dy', (d) => {
        return this.graphNodes.node_size(d) + text_base_offset + text_offset * parseInt(prop_id_nb, 10);
      })
      // .attr("y", ".31em")
      .text((d) => {
        return this.get_prop_value(d, prop_name, item);
      });
  }


  get_prop_value(d, prop_name, item) {
    if (prop_name in d.properties) {
      if (item === 'nodes') {
        if (this.format === GraphsonFormat.GraphSON3) {
          return d.properties[prop_name]['summary'];
        } else if (this.format === GraphsonFormat.GraphSON1) {
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

  colorize(data) {
    this.graphNodes.colorize(data);
  }

  displayInfo(data) {
    this.selectedNode.next(data);
  }

  loadRelatedNodes(d) {
    this.graphexpService.getRelatedNodes(d).then((arrangedData) => {
      this.refresh_data(arrangedData, 1, null);
      this.displayInfo(d);
    });
  }


  init(label) {
    let svg = d3.select(label).select('svg');
    this._graphWidth = +d3.select(label).node().getBoundingClientRect().width
    this._graphHeight = +d3.select(label).node().getBoundingClientRect().height;

    svg.attr('width', this._graphWidth).attr('height', this._graphHeight);
    svg = this.addzoom(svg);
    this._graphRoot = svg;

    this._graphLayers = new GraphLayers(this);
    this.graphShapes = new GraphShapes(this.format, this, this.graphexpService);
    this.graphNodes = new GraphNodes(this);
    this.graphLinks = new GraphLinks(this);
  }

  constructor(public graphexpService: GraphexpService, private format: GraphsonFormat) {}
}
