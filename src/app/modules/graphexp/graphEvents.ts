import { GraphShapes } from './graphShapes';
import { GraphViz } from './graphViz';
import { GraphexpService } from './graphexp.service';
import * as d3 from 'd3';

export class GraphEvents {

  graphexpService: GraphexpService;
  graphShapes: GraphShapes;
  _svg: any;

  get _simulation() {
    return this.graphViz._simulation;
  }

  //////////////////////////////////
  // Handling mouse events

  dragstarted(d) {
    if (!d3.event.active) { this._simulation.alphaTarget(0.3).restart(); }
    d.fx = d.x;
    d.fy = d.y;
  }

  dragged(d) {
    const connected_edges = this.graphViz.get_node_edges(d.id);
    const f_connected_edges = connected_edges.filter('*:not(.active_edge)')
    if (f_connected_edges._groups[0].length === 0) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    } else {
      f_connected_edges
        .style('stroke-width', function() {return parseInt(d3.select(this).attr('stroke-width'), 10) + 2; })
        .style('stroke-opacity', 1)
        .classed('blocking', true)
    }
  }

  dragended(d) {
    if (!d3.event.active) {
      this._simulation.alphaTarget(0);
    }
    d3.selectAll('.blocking')
      .style('stroke-width', function() {return d3.select(this).attr('stroke-width'); })
      .style('stroke-opacity', function() {return d3.select(this).attr('stroke-opacity'); })
      .classed('blocking', false)
    // d.fx = null;
    // d.fy = null;
  }

  clicked(d) {
    d3.select('.focus_node').remove();
    this.
      // TODO: wire up 'freeze' button
      // const input = document.getElementById('freeze-in');
      // const isChecked = input.checked;
      // if (isChecked) {
      //  infobox.display_info(d);
      // } else {
      _simulation.stop();
    // remove the oldest links and nodes
    const stop_layer = this.graphViz.graphLayers.depth() - 1;
    this._svg.selectAll('.old_node' + stop_layer).remove();
    this._svg.selectAll('.old_edge' + stop_layer).remove();
    this._svg.selectAll('.old_edgepath' + stop_layer).remove();
    this._svg.selectAll('.old_edgelabel' + stop_layer).remove();
    this.graphViz.displayInfo(d);
    this.graphexpService.getRelatedNodes(d);
    console.log('node clicked')
  }


  pin_it(d) {
    d3.event.stopPropagation();
    const node_pin = d3.select(this);
    const pinned_node = d3.select(node_pin.parentNode);
    // console.log('Pinned!')
    // console.log(pinned_node.classed('node'));
    if (pinned_node.classed('active_node')) {
      if (!pinned_node.classed('pinned')) {
        pinned_node.classed('pinned', true);
        console.log('Pinned!');
        node_pin.attr('fill', '#000');
        pinned_node.moveToFront();
      } else {
        pinned_node.classed('pinned', false);
        console.log('Unpinned!');
        node_pin.attr('fill', this.graphShapes.node_color);
      }
    }
  }

  constructor(private graphViz: GraphViz) {
    this.graphexpService = graphViz.graphexpService;
    this.graphShapes = graphViz.graphShapes;
    this._svg = graphViz._svg;
  }
}
