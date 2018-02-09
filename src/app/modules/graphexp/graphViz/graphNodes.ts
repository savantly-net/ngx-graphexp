import {ArrangedGraphData} from '../graphexp.service';
import { D3Node } from '../nodes/d3Node';
import { ConnectionCreatedEvent } from './ConnectionCreatedEvent';
import { GraphConfig } from './graphConfig';
import {GraphViz} from './graphViz';
import * as d3 from 'd3';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class GraphNodes {

  mouseDownNode: D3Node;

  public connectionCreated: BehaviorSubject<ConnectionCreatedEvent> = new BehaviorSubject<ConnectionCreatedEvent>(null);

  get config(): GraphConfig {
    return this.graphViz.config;
  }
  get graphRoot() {
    return this.graphViz.graphRoot;
  }

  get nodeModels() {
    return this.graphViz.nodeModels;
  }

  get simulation() {
    return this.graphViz.simulation;
  }

  get isShifted() {
    return window.event['shiftKey'] === true;
  }

  /**
   * get all active nodes in the graph
   */
  get graphNodes() {
    return this.graphViz.selectGraphNodes;
  }

  mouseXY(relativeNode) {
    const xy = d3.mouse(relativeNode);
    return {
      x: xy[0],
      y: xy[1]
    }
  }

  /**
   * for each tick
   */
  tick() {
    this.graphNodes
      .attr('transform', function(d) {
        return `translate(${d.x}, ${d.y})`;
      });
  }

  /**
   * update the node data in the graph
   */
  update(arrangedData: ArrangedGraphData) {
    console.log('GraphNodes#update');

    // old nodes not active any more are tagged
    this.graphNodes.exit().classed('old_node0', true).classed('active_node', false);

    // nodes associated to the data are constructed
    let nodes = this.graphNodes.enter();

    // add node decoration
    const node_deco = this.decorateNodes(nodes);
    nodes = node_deco.merge(nodes);
  }

  decorateNodes(node) {
    const _self = this;
    const node_deco = node.append('g')
      .attr('class', 'active_node').attr('ID', function(d) {
        return d.id;
      })
      .classed('node', true);

    // Attach the event listener
    this.attachNodeEvents(node_deco)
    node_deco.moveToFront();

    // Create the circle shape
    const node_base_circle = node_deco.append('circle').classed('base_circle', true)
      .attr('r', (d) => this.getNodeSize(d))
      .style('stroke-width', (d) => this.getNodeStrokeWidth(d))
      .style('stroke', 'black')
      .attr('fill', (d) => this.getNodeColor(d));
    node_base_circle.append('title').text(d => this.getNodeText(d));

    // Add the text to the nodes
    node_deco.append('text').classed('text_details', true)
      .attr('x', (d) => {
        return this.config.default_node_size + 2;
      })
      .text(d => this.getNodeText(d))
      .style('visibility', 'hidden');

    node_deco.append('text').classed('text_details', true)
      .attr('x', (d) => {
        return this.config.default_node_size + 4;
      })
      .attr('y', this.config.default_node_size)
      .text(d => this.getNodeSubText(d))
      .style('visibility', 'hidden');


    // Add the node pin
    const node_pin = node_deco.append('circle').classed('Pin', true)
      .attr('r', (d) => {
        return this.config.default_node_size / 2;
      })
      .attr('transform', (d) => {
        return 'translate(' + (this.config.default_node_size * 3 / 4) + ',' + (-this.config.default_node_size * 3 / 4) + ')';
      })
      .attr('fill', this.config.default_node_color)
      .moveToBack()
      .style('visibility', 'hidden');

    node_pin.on('click', function(this, d) {
      _self.pinIt(this, d);
    });

    // spot the active node and draw additional circle around it
    /* TODO: make active node different
    if (with_active_node) {
      d3.selectAll('.active_node').each((d) => {
        if (d.id === with_active_node) {
          const n_radius = Number(d3.select(this).select('.base_circle').attr('r')) + this.active_node_margin;
          d3.select(this)
            .append('circle').classed('focus_node', true)
            .attr('r', n_radius)
            .attr('fill', this.node_color)
            .attr('opacity', this.active_node_margin_opacity)
            .moveToBack();
        }
      });
    }
     */

    return node_deco;
  }

  attachNodeEvents(node) {
    const _self = this;
    node.call(d3.drag()
      .on('start', function(d) {
        if (_self.isShifted) {
          _self.dragConnectionStarted(d);
        } else {
          _self.dragNodeStarted(d);
        }
      })
      .on('drag', function(d) {
        if (_self.isShifted) {
          _self.draggingConnection(d);
        } else {
          _self.draggingNode(d);
        }
      })
      .on('end', (ev) => {
        if (this.isShifted) {
          this.dragConnectionEnded(ev);
        } else {
          this.dragNodeEnded(ev);
        }
      }));


    node.on('click', (ev) => {this.clicked(ev)})
      .on('mouseover', function() {
        d3.select(this).select('.Pin').style('visibility', 'visible');
        d3.select(this).selectAll('.text_details').style('visibility', 'visible');
      })
      .on('mouseout', function() {
        const chosen_node = d3.select(this);
        if (!chosen_node.classed('pinned')) {
          d3.select(this).select('.Pin').style('visibility', 'hidden');
        }
        if (!this.show_name) {
          d3.select(this).selectAll('.text_details').style('visibility', 'hidden');
        }
      });
  }

   getConnectedEdgesByNodeId(node_id) {
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

  //////////////////////////////////
  // Handling mouse events

  dragConnectionStarted(d) {
    this.mouseDownNode = d;
  }

  dragNodeStarted(d) {
    if (!d3.event.active) {
      this.simulation.alphaTarget(0.3).restart();
    }
    d.fx = d.x;
    d.fy = d.y;
  }

  draggingConnection(d) {
    // reposition dragged directed edge
    if (!this.mouseDownNode) {
      return;
    }
    const dragLine = this.graphViz.dragLine.classed('hidden', false);
    const transform = this.graphRoot.attr('transform');
    this.graphViz.dragLine
      .attr('d', `M ${d.x},${d.y} L ${d3.event.x}, ${d3.event.y}`)
      .attr('transform', transform);
    console.log('dragging new connection');
  }

  draggingNode(d) {
    const connected_edges = this.getConnectedEdgesByNodeId(d.id);
    const f_connected_edges = connected_edges.filter('*:not(.active_edge)')
    if (f_connected_edges._groups[0].length === 0) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    } else {
      f_connected_edges
        .style('stroke-width', function() {
          return parseInt(d3.select(this).attr('stroke-width'), 10) + 2;
        })
        .style('stroke-opacity', 1)
        .classed('blocking', true)
    }
  }

  dragConnectionEnded(d) {
    const target = d3.event.sourceEvent.toElement;
    this.graphViz.dragLine.classed('hidden', true);
    console.log(`connecting to: ${target}`);
    this.connectionCreated.next({
      source: this.mouseDownNode,
      target: d3.select(target).data()[0]
    });
  }

  dragNodeEnded(d) {
    if (!d3.event.active) {
      this.simulation.alphaTarget(0);
    }
    d3.selectAll('.blocking')
      .style('stroke-width', function() {
        return d3.select(this).attr('stroke-width');
      })
      .style('stroke-opacity', function() {
        return d3.select(this).attr('stroke-opacity');
      })
      .classed('blocking', false)
    // d.fx = null;
    // d.fy = null;
  }

  clicked(d) {
    d3.select('.focus_node').remove();

      // TODO: wire up 'freeze' button
      // const input = document.getElementById('freeze-in');
      // const isChecked = input.checked;
      // if (isChecked) {
      //  infobox.display_info(d);
      // } else {
    this.simulation.stop();
    // remove the oldest links and nodes
    const stop_layer = this.graphViz.graphLayers.depth() - 1;
    this.graphRoot.selectAll('.old_node' + stop_layer).remove();
    this.graphRoot.selectAll('.old_edge' + stop_layer).remove();
    this.graphRoot.selectAll('.old_edgepath' + stop_layer).remove();
    this.graphRoot.selectAll('.old_edgelabel' + stop_layer).remove();
    this.graphViz.displayInfo(d);
    this.graphViz.loadRelatedNodes(d);
    console.log('node clicked')
  }


  pinIt(elem, data) {
    d3.event.stopPropagation();
    const node_pin = d3.select(elem);
    const pinned_node = d3.select(elem.parentNode);
    if (!pinned_node.empty() && pinned_node.classed('active_node')) {
      if (!pinned_node.classed('pinned')) {
        pinned_node.classed('pinned', true);
        console.log('Pinned!');
        node_pin.attr('fill', '#000');
        pinned_node.moveToFront();
      } else {
        pinned_node.classed('pinned', false);
        console.log('Unpinned!');
        node_pin.attr('fill', () => this.getNodeColor(data));
      }
    }
  }

  colorize(prop_name) {
    // Color the nodes according the value of the property 'prop_name'
    let node_code_color = null;
    const value_list = d3.selectAll('.node').data();
    if (prop_name === 'none') {
      d3.selectAll('.base_circle').style('fill', (d) => {
        return this.getNodeColor(d);
      });
      d3.selectAll('.Pin').style('fill', (d) => {
        return this.getNodeColor(d);
      });
    } else if (prop_name === 'label') {
      const value_set = new Set(value_list.map((d) => {
        return d.label;
      }));
      node_code_color = d3.scaleOrdinal().domain(value_set).range(d3.range(0, value_set.size));
      d3.selectAll('.base_circle').style('fill', (d) => {
        return this.config.colorPalette(node_code_color(d.label));
      });
      d3.selectAll('.Pin').style('fill', (d) => {
        return this.config.colorPalette(node_code_color(d.label));
      });
    } else {
      const value_set = new Set(value_list.map((d) => {
        if (typeof d.properties[prop_name] !== 'undefined') {
          return d.properties[prop_name][0].value;
        }
      }));
      node_code_color = d3.scaleOrdinal().domain(value_set).range(d3.range(0, value_set.size));
      d3.selectAll('.base_circle').style('fill', (d) => {
        if (typeof d.properties[prop_name] !== 'undefined') {
          return this.config.colorPalette(node_code_color(d.properties[prop_name][0].value));
        }
        return this.getNodeColor(d);
      });
      d3.selectAll('.Pin').style('fill', (d) => {
        if (typeof d.properties[prop_name] !== 'undefined') {
          return this.config.colorPalette(node_code_color(d.properties[prop_name][0].value));
        }
        return this.getNodeColor(d);
      });
    }
  }

  getNodeSize(d) {
    if ('size' in d) {
      return d.size;
    } else {
      return this.config.default_node_size;
    }
  }

  getNodeStrokeWidth(d) {
    if ('stroke_width' in d) {
      return d.stroke_width;
    } else {
      return this.config.default_stroke_width;
    }
  }

  getNodeColor(d) {
    return this.config.default_node_color;
    /*
    if (colored_prop !== 'none') {
      if (colored_prop === 'label') {
        return this.color_palette(node_code_color(d.label));
      } else if (typeof d.properties[colored_prop] !== 'undefined') {
        if (this.graphSONFormat === GraphsonFormat.GraphSON3) {
          return this.color_palette(node_code_color(d.properties[colored_prop]['summary']));
        } else {
          return this.color_palette(node_code_color(d.properties[colored_prop][0].value));
        }
      } else if ('color' in d.properties) {
        return d.properties.color[0].value;
      } else {
        return this.default_node_color;
      }
    } else if ('color' in d.properties) {
      return d.properties.color[0].value;
    } else {
      return this.default_node_color;
    } */
  }

  getNodeTitle(d) {
    if ('node_title' in d) {
      return d.node_title;
    } else {
      return d.label;
    }
  }

  getNodeText(d) {
    if ('node_text' in d) {
      return d.node_text;
    } else {
      return d.id;
    }
  }

  getNodeSubText(d) {
    if ('node_subtext' in d) {
      return d.node_subtext;
    } else {
      return d.label;
    }
  }


  constructor(private graphViz: GraphViz) {}
}
