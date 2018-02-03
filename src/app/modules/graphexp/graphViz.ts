import {GraphLayers} from './GraphLayers';
import { GraphEvents } from './graphEvents';
import * as d3 from 'd3';

export class GraphViz {

  _svg: any = {};
  _svg_width = 0;
  _svg_height = 0;
  _nodes: any = {};
  _links: any = {};
  _simulation: any = {};
  _Nodes = [];
  _Links = [];
  force_strength: number;
  link_strength: number;
  force_x_strength: number;
  force_y_strength: number;
  graph_events: GraphEvents;

  init(label) {
    this._svg = d3.select(label).select('svg');
    this._svg_width = +d3.select(label).node().getBoundingClientRect().width
    this._svg_height = +d3.select(label).node().getBoundingClientRect().height;
    this._svg.attr('width', this._svg_width).attr('height', this._svg_height);
  }


  get_simulation_handle() {
    return this._simulation;
  }

  svg_handle() {
    return this._svg;
  }

  nodes() {
    return this._nodes;
  }

  nodes_data() {
    return this._Nodes;
  }

  node_data(id) {
    // return data associated to the node with id 'id'
    for (const node in this._Nodes) {
      // console.log(_Nodes[node])
      if (this._Nodes[node].id === id) {
        return this._Nodes[node];
      }
    }
  }

  links() {
    return this._links;
  }

  links_data() {
    return this._Links;
  }

  create_arrows(edge_in) {
    const edge_data = edge_in.data();
    const arrow_data = this._svg.selectAll('.arrow').data();
    const data = arrow_data.concat(edge_data);

    this._svg.selectAll('.arrow')
      .data(data)
      .enter()
      .append('marker')
      .attr('class', 'arrow')
      .attr('id', (d) => {return 'marker_' + d.id})
      .attr('markerHeight', 5)
      .attr('markerWidth', 5)
      .attr('markerUnits', 'strokeWidth')
      .attr('orient', 'auto')
      .attr('refX', (d) => {
        const node = this.node_data(d.target);
        return this.graphShapes.node_size(node) + this.graphShapes.node_stroke_width(node);
      })
      .attr('refY', 0)
      .attr('viewBox', '0 -5 10 10')
      .append('svg:path')
      .attr('d', 'M0,-5L10,0L0,5')
      .style('fill', (d) => {return this.graphShapes.edge_color(d)});
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
    this._svg.selectAll('*').remove();
    this._Nodes = [], this._Links = [];
    this.layers.clear_old();
    this._simulation = {};
  }

  zoomed() {
    this._svg.attr('transform', d3.event.transform);
  }

  addzoom() {
    // Add zoom to the svg object
    this._svg.append('rect')
      .attr('width', this._svg_width).attr('height', this._svg_height)
      .style('fill', 'none').style('pointer-events', 'all')
      .call(d3.zoom().scaleExtent([1 / 2, 4]).on('zoom', this.zoomed));
    this._svg = this._svg.append('g');


    return this._svg;
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
      this._simulation.force('center', d3.forceCenter(this._svg_width / 2, this._svg_height / 2));
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
  refresh_data(d, center_f, with_active_node) {
    // Main visualization function
    const svg_graph = this.svg_handle();
    this.layers.push_layers();
    this.layers.update_data(d);

    //////////////////////////////////////
    // link handling
    // attach the data
    const all_links = svg_graph.selectAll('.active_edge')
      .data(this._Links, (n) => {
        return n.id;
      });
    const all_edgepaths = svg_graph.selectAll('.active_edgepath')
      .data(this._Links, (n) => {
        return n.id;
      });
    const all_edgelabels = svg_graph.selectAll('.active_edgelabel')
      .data(this._Links, (n) => {
        return n.id;
      });

    // links not active anymore are classified old_links
    all_links.exit().classed('old_edge0', true).classed('active_edge', false);
    all_edgepaths.exit().classed('old_edgepath0', true).classed('active_edgepath', false);
    all_edgelabels.exit().classed('old_edgelabel0', true).classed('active_edgelabel', false);


    // handling active links associated to the data
    const edgepaths_e = all_edgepaths.enter(),
      edgelabels_e = all_edgelabels.enter(),
      link_e = all_links.enter();
    const decor_out = this.graphShapes.decorate_link(link_e, edgepaths_e, edgelabels_e);
    this._links = decor_out[0];

    let edgepaths = decor_out[1],
      edgelabels = decor_out[2];

    // previous links plus new links are merged
    this._links = this._links.merge(all_links);
    edgepaths = edgepaths.merge(all_edgepaths);
    edgelabels = edgelabels.merge(all_edgelabels);


    ///////////////////////////////////
    // node handling

    const all_nodes = svg_graph.selectAll('g').filter('.active_node')
      .data(this._Nodes, (n) => {
        return n.id;
      });

    // console.log(data_node);
    // old nodes not active any more are tagged
    all_nodes.exit().classed('old_node0', true).classed('active_node', false);


    // nodes associated to the data are constructed
    this._nodes = all_nodes.enter();

    // add node decoration
    const node_deco = this.graphShapes.decorate_node(this._nodes, with_active_node);

    this._nodes = node_deco.merge(all_nodes);


      //////////////////////////////////
      // Additional clean up
    this.graphShapes.decorate_old_elements(this.layers.depth());
    svg_graph.selectAll('g').filter('.pinned').moveToFront();


    this.layers.remove_duplicates('.active_node', '.old_node');
    this.layers.remove_duplicates('.active_edge', '.old_edge');
    this.layers.remove_duplicates('.active_edgepath', '.old_edgepath');
    this.layers.remove_duplicates('.active_edgelabel', '.old_edgelabel');


    // Force simulation simulation model and paramers Associate the simulation with the data
    this._simulation = this.simulation_start(center_f);
    this._simulation.nodes(this._Nodes).on('tick', () => {this.ticked(edgepaths, edgelabels); });
    this._simulation.force('link').links(this._Links);
    this._simulation.alphaTarget(0);

  }

      ////////////////////////
    // handling simulation steps
    // move the nodes and links at each simulation step, following this rule:
    ticked(edgepaths, edgelabels) {
      this._links
        .attr('x1', function(d) {
          return d.source.x;
        })
        .attr('y1', function(d) {
          return d.source.y;
        })
        .attr('x2', function(d) {
          return d.target.x;
        })
        .attr('y2', function(d) {
          return d.target.y;
        });
      this._nodes
        .attr('transform', function(d) {
          return `translate('${d.x}', '${d.y}')`;
        });

      edgepaths.attr('d', function(d) {
        return 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y;
      });

      edgelabels.attr('transform', function(d) {
        if (d.target.x < d.source.x) {
          const bbox = this.getBBox();

          const rx = bbox.x + bbox.width / 2;
          const ry = bbox.y + bbox.height / 2;
          return 'rotate(180 ' + rx + ' ' + ry + ')';
        } else {
          return 'rotate(0)';
        }
      });
    }


  get_node_edges(node_id) {
    // Return the in and out edges of node with id 'node_id'
    const connected_edges = d3.selectAll('.edge').filter(
      function(item) {
        if (item.source === node_id || item.source.id === node_id) {
          return item;
        } else if (item.target === node_id || item.target.id === node_id) {
          return item;
        }
      });
    return connected_edges;
  }

  constructor(private graphShapes: any, private layers: GraphLayers) {}
}
