import {GraphViz} from './graphViz';
import { GraphexpService, GraphsonFormat } from './graphexp.service';
import * as d3 from 'd3';

export class GraphShapes {
  // Nodes
  default_node_size = 15;
  default_stroke_width = 2;
  default_node_color = '#80E810';
  active_node_margin = 6;
  active_node_margin_opacity = 0.3;

  // Edges
  default_edge_stroke_width = 3;
  default_edge_color = '#CCC';
  edge_label_color = '#111';

  color_palette: (item: any) => any = d3.scaleOrdinal(d3.schemeCategory20);

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

  node_color(d, colored_prop, node_code_color: (label: string) => any) {
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
    }
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

  edge_stroke_width(d) {
    if ('stroke_width' in d) {
      return d.stroke_width;
    } else {
      return this.default_edge_stroke_width;
    }
  }

  edge_text(d) {
    if ('text' in d) {
      return d.text;
    } else {
      return d.properties.weight;
    }
  }

  edge_color(d) {
    if ('color' in d) {
      return d.color;
    } else {
      return this.default_edge_color;
    }
  }




  /////////////////////////////////////////////////////////////
  // decorate the node
  decorate_node(node, with_active_node) {
    // the node layout is defined here
    // node: the selection of nodes with their data
    // with_active_node: the Id of the active node if any

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
      .attr('r', this.node_size)
      .style('stroke-width', this.node_stroke_width)
      .style('stroke', 'black')
      .attr('fill', this.node_color);
    node_base_circle.append('title').text(this.node_title);

    // Add the text to the nodes
    node_deco.append('text').classed('text_details', true)
      .attr('x', (d) => {
        return this.node_size(d) + 2;
      })
      .text(this.node_text)
      .style('visibility', 'hidden');

    node_deco.append('text').classed('text_details', true)
      .attr('x', (d) => {
        return this.node_size(d) + 2;
      })
      .attr('y', this.node_size)
      .text(this.node_subtext)
      .style('visibility', 'hidden');


    // Add the node pin
    const node_pin = node_deco.append('circle').classed('Pin', true)
      .attr('r', (d) => {
        return this.node_size(d) / 2;
      })
      .attr('transform', (d) => {
        return 'translate(' + (this.node_size(d) * 3 / 4) + ',' + (-this.node_size(d) * 3 / 4) + ')';
      })
      .attr('fill', this.node_color)
      .moveToBack()
      .style('visibility', 'hidden');

    node_pin.on('click', this.graph_viz.graphEvents.pin_it);

    // spot the active node and draw additional circle around it
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


    // add property info if checkbox checked
    this.add_checkbox_prop('nodes', node_deco)

    return node_deco;
  }

  attach_node_actions(node) {
    node.call(d3.drag()
      .on('start', this.graph_viz.graphEvents.dragstarted)
      .on('drag', this.graph_viz.graphEvents.dragged)
      .on('end', this.graph_viz.graphEvents.dragended));


    node.on('click', this.graph_viz.graphEvents.clicked)
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

  decorate_link(edges, edgepaths, edgelabels) {

    const edges_deco = edges.append('line').attr('class', 'edge').classed('active_edge', true)
      .attr('source_ID', function(d) {
        return d.source;
      })
      .attr('target_ID', function(d) {
        return d.target;
      })
      .attr('ID', function(d) {
        return d.id;
      });


    this.graph_viz.create_arrows(edges_deco);
    // Attach the arrows
    edges_deco.attr('marker-end', function(d) {
      return 'url(#marker_' + d.id + ')'
    })
      .attr('stroke-width', this.edge_stroke_width)
      .append('title').text(function(d) {
        return d.properties.weight;
      });

    // Attach the edge labels
    const e_label = this.create_edge_label(edgepaths, edgelabels);
    const edgepaths_deco = e_label[0];
    const edgelabels_deco = e_label[1];

    edgelabels_deco.append('textPath')
      .attr('class', 'edge_text')
      .attr('href', function(d, i) {
        return '#edgepath' + d.id
      })
      .style('text-anchor', 'middle')
      .style('pointer-events', 'none')
      .attr('startOffset', '50%')
      .text(function(d) {
        return d.label
      });


    // Attach the edge actions
    this.attach_edge_actions(edges_deco)


    // Add property info if checkbox checked
    this.add_checkbox_prop('edges', edgelabels_deco)

    return [edges_deco, edgepaths_deco, edgelabels_deco]

  }

  add_checkbox_prop(item, selected_items) {
    // Add text from a property if the checkbox is checked on the sidebar
    let item_properties;
    if (item === 'edges') {
      item_properties = this.graphexpService.edgeProperties.value;
    } else if (item === 'nodes') {
      item_properties = this.graphexpService.nodeProperties.value;
    }
    for (let prop_idx = 0; prop_idx < item_properties.length; prop_idx++) {
      const prop_name = item_properties[prop_idx];
      const prop_id_nb = prop_idx;
      const prop_id = item + '_' + prop_name;
      if ((!d3.select('#' + prop_id).empty()) && d3.select('#' + prop_id).property('checked')) {
        this.graph_viz.attach_property(selected_items, prop_name, prop_id_nb, item);
      }
    }
  }

  create_edge_label(edgepaths, edgelabels) {
    const edgepaths_deco = edgepaths.append('path')
      .attr('class', 'edgepath').classed('active_edgepath', true)
      .attr('fill-opacity', 0)
      .attr('stroke-opacity', 0)
      .attr('id', function(d, i) {
        return 'edgepath' + d.id;
      })
      .attr('ID', function(d) {
        return d.id;
      })
      .style('pointer-events', 'none');

    const edgelabels_deco = edgelabels.append('text')
      .attr('dy', -3)
      .style('pointer-events', 'none')
      .attr('class', 'edgelabel').classed('active_edgelabel', true)
      .attr('id', function(d, i) {
        return 'edgelabel' + d.id
      })
      .attr('ID', function(d) {
        return d.id;
      })
      .attr('font-size', 10)
      .attr('fill', this.edge_label_color);

    return [edgepaths_deco, edgelabels_deco];


  }

  attach_edge_actions(edge) {
    edge.on('mouseover', (theEdge, index, elements) => {
      console.log('mouse over!!');
      const line = elements[index];
      d3.select(line).selectAll('.text_details').style('visibility', 'visible');
    })
      .on('mouseout', (theEdge, index, elements) => {
      const line = elements[index];
        d3.select(line).selectAll('.text_details').style('visibility', 'hidden');
      })
      .on('click', (theEdge, index, elements) => {
        console.log('edge clicked!'); this.graphexpService.updateSelection(theEdge);
      });

  }



  decorate_old_elements(nb_layers) {
    // Decrease the opacity of nodes and edges when they get old
    for (let k = 0; k < nb_layers; k++) {
      d3.selectAll('.old_edge' + k)
        .style('opacity', function() {
          return 0.8 * (1 - k / nb_layers)
        });
      d3.selectAll('.old_node' + k)
        .style('opacity', function() {
          return 0.8 * (1 - k / nb_layers)
        });
      d3.selectAll('.old_edgelabel' + k)
        .style('opacity', function() {
          return 0.8 * (1 - k / nb_layers)
        });

    };
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
        return this.color_palette(node_code_color(d.label));
      });
      d3.selectAll('.Pin').style('fill', (d) => {
        return this.color_palette(node_code_color(d.label));
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
          return this.color_palette(node_code_color(d.properties[prop_name][0].value));
        }
        return this.node_color(d, prop_name, node_code_color);
      });
      d3.selectAll('.Pin').style('fill', (d) => {
        if (typeof d.properties[prop_name] !== 'undefined') {
          return this.color_palette(node_code_color(d.properties[prop_name][0].value));
        }
        return this.node_color(d, prop_name, node_code_color);
      });
    }
  }

  show_names(value: boolean) {
    const text_to_show = d3.selectAll('.text_details');
    if (value) {
      text_to_show.style('visibility', 'visible');
    } else {
      text_to_show.style('visibility', 'hidden');
    }
  }

  constructor(private graphSONFormat: GraphsonFormat, private graph_viz: GraphViz, private graphexpService: GraphexpService) {
    // https://github.com/wbkd/d3-extended
    d3.selection.prototype.moveToFront = function() {
      // move the selection to the front
      return this.each(function() {
        this.parentNode.appendChild(this);
      });
    };

    d3.selection.prototype.moveToBack = function() {
      // move the selection to the back
      return this.each(function() {
        const firstChild = this.parentNode.firstChild;
        if (firstChild) {
          this.parentNode.insertBefore(this, firstChild);
        }
      });
    };

  }



}
