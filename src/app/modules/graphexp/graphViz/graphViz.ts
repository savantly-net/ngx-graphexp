import {GraphLayers} from './graphLayers';
import {GraphShapes} from './graphShapes';
import {GraphexpService, GraphsonFormat, ArrangedGraphData} from '../graphexp.service';
import { D3Node } from '../nodes/d3Node';
import { ConnectionCreatedEvent } from './ConnectionCreatedEvent';
import {GraphConfig} from './graphConfig';
import {GraphLinks} from './graphLinks';
import {GraphNodes} from './graphNodes';
import * as d3 from 'd3';
import { Observable } from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

export class GraphViz {

  private _graphRoot: any;
  private _graphWidth = 0;
  private _graphHeight = 0;
  private _simulation: any = {};
  private _graphLayers: GraphLayers;
  private _graphShapes: GraphShapes;
  private _graphNodes: GraphNodes;
  private _graphLinks: GraphLinks;

  dragLine;

  readonly state = {
    shiftNodeDrag: false
  };

  public selectedNode: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public connectionCreated: Observable<ConnectionCreatedEvent>;
  public createNodeEvent: BehaviorSubject<D3Node> = new BehaviorSubject<D3Node>(null);

  get config() {
    return this._config;
  }
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

  get graphNodes() {
    return this._graphNodes;
  }

  get linkModels() {
    return this._graphLayers._Links;
  }

  get selectLinks() {
    const all_links = this.graphRoot.selectAll('.active_edge')
      .data(this.linkModels, (n) => {
        return n.id;
      });
    return all_links;
  }

  get selectEdgePaths() {
    const all_edgepaths = this.graphRoot.selectAll('.active_edgepath')
      .data(this.linkModels, (n) => {
        return n.id;
      });
    return all_edgepaths;
  }

  get selectEdgeLabels() {
    const all_edgelabels = this.graphRoot.selectAll('.active_edgelabel')
      .data(this.linkModels, (n) => {
        return n.id;
      });
    return all_edgelabels;
  }

  /**
  * get all active nodes in the graph
  */
  get selectGraphNodes() {
    // Existing active nodes
    const allNodes = this.graphRoot.selectAll('g').filter('.active_node')
      .data(this.nodeModels, (n) => {
        return n.id;
      });
    return allNodes;
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
  }

  simulationStart(center_f) {
    let force_x, force_y;
    this.
      // Define the force applied to the nodes
      _simulation = d3.forceSimulation()
        .force('charge', d3.forceManyBody().strength(this._config.force_strength))
        .force('link', d3.forceLink().strength(this._config.link_strength).id((d) => {
          return d.id;
        }));

    if (center_f === 1) {
      force_y = this._config.force_x_strength;
      force_x = this._config.force_y_strength;
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


  refreshData(arrangedData: ArrangedGraphData, center_f, with_active_node) {
    // Main visualization function
    const svg_graph = this.graphRoot;
    this._graphLayers.push_layers();
    this._graphLayers.update_data(arrangedData);

    this._graphLinks.update(arrangedData);

    this._graphNodes.update(arrangedData);

    //////////////////////////////////
    // Additional clean up
    this._graphShapes.decorate_old_elements(this._graphLayers.depth());
    svg_graph.selectAll('g').filter('.pinned').moveToFront();


    this._graphLayers.remove_duplicates('.active_node', '.old_node');
    this._graphLayers.remove_duplicates('.active_edge', '.old_edge');
    this._graphLayers.remove_duplicates('.active_edgepath', '.old_edgepath');
    this._graphLayers.remove_duplicates('.active_edgelabel', '.old_edgelabel');


    // Force simulation simulation model and paramers Associate the simulation with the data
    this._simulation = this.simulationStart(center_f);
    this._simulation.nodes(this.nodeModels).on('tick', () => {
      this._graphNodes.tick();
      this._graphLinks.tick();
    });
    this._simulation.force('link').links(this.linkModels);
    this._simulation.alphaTarget(0);

  }

  displayShapeProperty(prop) {
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
      this.attachEnabledProperties(elements_text, prop_name, prop_id_nb, item);
    } else {
      if (item === 'nodes') {
        d3.selectAll('.node').select('.' + prop_id).remove();
      } else if (item === 'edges') {
        d3.selectAll('.edgelabel').select('.' + prop_id).remove();
      }

    }
  }


  attachEnabledProperties(graph_objects, prop_name, prop_id_nb, item) {
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
        return this._graphNodes.getNodeSize(d) + text_base_offset + text_offset * parseInt(prop_id_nb, 10);
      })
      // .attr("y", ".31em")
      .text((d) => {
        return this.getPropertyValue(d, prop_name, item);
      });
  }


  getPropertyValue(d, prop_name, item) {
    if (prop_name in d.properties) {
      if (item === 'nodes') {
        if (this._config.format === GraphsonFormat.GraphSON3) {
          return d.properties[prop_name]['summary'];
        } else if (this._config.format === GraphsonFormat.GraphSON1) {
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
    this._graphNodes.colorize(data);
  }

  displayInfo(data) {
    this.selectedNode.next(data);
  }

  loadRelatedNodes(d) {
    this.graphexpService.getRelatedNodes(d).then((arrangedData) => {
      this.refreshData(arrangedData, 1, null);
      this.displayInfo(d);
    });
  }

  addSvgDefinitions(svg) {
    // define arrow markers for graph links
    const defs = svg.append('svg:defs');
    defs.append('svg:marker')
      .attr('id', 'end-arrow')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', '32')
      .attr('markerWidth', 5)
      .attr('markerHeight', 5)
      .attr('orient', 'auto')
      .append('svg:path')
      .attr('d', 'M0,-5L10,0L0,5');

    // define arrow markers for leading arrow
    defs.append('svg:marker')
      .attr('id', 'mark-end-arrow')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 7)
      .attr('markerWidth', 5)
      .attr('markerHeight', 5)
      .attr('orient', 'auto')
      .append('svg:path')
      .attr('d', 'M0,-5L10,0L0,5');
  }

  init(label) {
    this._graphLayers = new GraphLayers(this);
    this._graphShapes = new GraphShapes(this._config.format, this, this.graphexpService);

    // GraphNodes class init
    this._graphNodes = new GraphNodes(this);
    this.connectionCreated = new Observable(observer => {
      this._graphNodes.connectionCreated.subscribe(val => {
        if (val != null) {
          observer.next(val);
          console.log(`connection created: ${val.source.id} -> ${val.target.id}`);
        }
      });
    });

    this._graphLinks = new GraphLinks(this);

    const svg = d3.select(label).select('svg');
    const width = +d3.select(label).node().getBoundingClientRect().width;
    const height =  +d3.select(label).node().getBoundingClientRect().height;
    this._graphWidth = width;
    this._graphHeight = height;

    // displayed when dragging between nodes
    this.dragLine = svg.append('svg:path')
      .attr('class', 'link drag-line hidden')
      .attr('d', 'M0,0L0,0')
      .style('marker-end', 'url(#mark-end-arrow)');

    svg.attr('width', this._graphWidth).attr('height', this._graphHeight);
    this.addSvgDefinitions(svg);
    this.addzoom(svg);

    // Finally create a root g node for all the nodes/links
    this._graphRoot = svg.append('g');
  }

  constructor(
    public graphexpService: GraphexpService,
    private _config: GraphConfig) {}
}
