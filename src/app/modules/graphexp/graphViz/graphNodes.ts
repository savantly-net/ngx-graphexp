import {ArrangedGraphData} from '../graphexp.service';
import {GraphViz} from './graphViz';
import * as d3 from 'd3';

export class GraphNodes {
  // Nodes
  default_node_size = 15;
  default_stroke_width = 2;
  default_node_color = '#80E810';
  active_node_margin = 6;
  active_node_margin_opacity = 0.3;

  colorPalette: (item: any) => any = d3.scaleOrdinal(d3.schemeCategory20);

  get graphRoot() {
    return this.graphViz.graphRoot;
  }

  get nodeModels() {
    return this.graphViz.nodeModels;
  }

  get simulation() {
    return this.graphViz.simulation;
  }

  /**
   * get all active nodes in the graph
   */
  get graphNodes() {
    // Existing active nodes
    const allNodes = this.graphRoot.selectAll('g').filter('.active_node')
      .data(this.nodeModels, (n) => {
        return n.id;
      });
    return allNodes;
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
    const node_deco = node.append('g')
      .attr('class', 'active_node').attr('ID', function(d) {
        return d.id;
      })
      .classed('node', true);

    // Attach the event listener
    this.attach_node_actions(node_deco)
    node_deco.moveToFront();

    // Create the circle shape
    const node_base_circle = node_deco.append('circle').classed('base_circle', true)
      .attr('r', this.default_node_size)
      .style('stroke-width', this.default_stroke_width)
      .style('stroke', 'black')
      .attr('fill', this.default_node_color);
    node_base_circle.append('title').text('todo: title');

    // Add the text to the nodes
    node_deco.append('text').classed('text_details', true)
      .attr('x', (d) => {
        return this.default_node_size + 2;
      })
      .text('todo: text-details')
      .style('visibility', 'hidden');

    node_deco.append('text').classed('text_details', true)
      .attr('x', (d) => {
        return this.default_node_size + 4;
      })
      .attr('y', this.default_node_size)
      .text('todo: subtext')
      .style('visibility', 'hidden');


    // Add the node pin
    const node_pin = node_deco.append('circle').classed('Pin', true)
      .attr('r', (d) => {
        return this.default_node_size / 2;
      })
      .attr('transform', (d) => {
        return 'translate(' + (this.default_node_size * 3 / 4) + ',' + (-this.default_node_size * 3 / 4) + ')';
      })
      .attr('fill', this.default_node_color)
      .moveToBack()
      .style('visibility', 'hidden');

    node_pin.on('click', this.pin_it);

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

  attach_node_actions(node) {
    node.call(d3.drag()
      .on('start', (ev) => {this.dragstarted(ev)})
      .on('drag', (ev) => {this.dragged(ev)})
      .on('end', (ev) => {this.dragended(ev)}));


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

  //////////////////////////////////
  // Handling mouse events

  dragstarted(d) {
    if (!d3.event.active) {
      this.simulation.alphaTarget(0.3).restart();
    }
    d.fx = d.x;
    d.fy = d.y;
  }

  dragged(d) {
    const connected_edges = this.get_node_edges(d.id);
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

  dragended(d) {
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


  pin_it(d) {
    d3.event.stopPropagation();
    const node_pin = d3.select(this);
    const pinned_node = d3.select(node_pin.parentNode);
    if (pinned_node.classed('active_node')) {
      if (!pinned_node.classed('pinned')) {
        pinned_node.classed('pinned', true);
        console.log('Pinned!');
        node_pin.attr('fill', '#000');
        pinned_node.moveToFront();
      } else {
        pinned_node.classed('pinned', false);
        console.log('Unpinned!');
        node_pin.attr('fill', this.graphNodes.node_color);
      }
    }
  }

  colorize(prop_name) {
    // Color the nodes according the value of the property 'prop_name'
    let node_code_color = null;
    const value_list = d3.selectAll('.node').data();
    if (prop_name === 'none') {
      d3.selectAll('.base_circle').style('fill', (d) => {
        return this.default_node_color
      });
      d3.selectAll('.Pin').style('fill', (d) => {
        return this.default_node_color;
      });
    } else if (prop_name === 'label') {
      const value_set = new Set(value_list.map((d) => {
        return d.label;
      }));
      node_code_color = d3.scaleOrdinal().domain(value_set).range(d3.range(0, value_set.size));
      d3.selectAll('.base_circle').style('fill', (d) => {
        return this.colorPalette(node_code_color(d.label));
      });
      d3.selectAll('.Pin').style('fill', (d) => {
        return this.colorPalette(node_code_color(d.label));
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
          return this.colorPalette(node_code_color(d.properties[prop_name][0].value));
        }
        return this.node_color(d);
      });
      d3.selectAll('.Pin').style('fill', (d) => {
        if (typeof d.properties[prop_name] !== 'undefined') {
          return this.colorPalette(node_code_color(d.properties[prop_name][0].value));
        }
        return this.node_color(d);
      });
    }
  }

  node_size(d) {
    if ('size' in d) {
      return d.size;
    } else {
      return this.default_node_size;
    }
  }

  node_stroke_width(d) {
    if ('stroke_width' in d) {
      return d.stroke_width;
    } else {
      return this.default_stroke_width;
    }
  }

  node_color(d) {
    return this.default_node_color;
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

  node_title(d) {
    if ('node_title' in d) {
      return d.node_title;
    } else {
      return d.label;
    }
  }

  node_text(d) {
    if ('node_text' in d) {
      return d.node_text;
    } else {
      return d.id;
    }
  }

  node_subtext(d) {
    if ('node_subtext' in d) {
      return d.node_subtext;
    } else {
      return d.label;
    }
  }


  constructor(private graphViz: GraphViz) {}
}
