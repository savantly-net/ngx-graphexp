import {GraphViz} from './graphViz';
import {GraphexpService, GraphsonFormat} from '../graphexp.service';
import * as d3 from 'd3';

export class GraphShapes {

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
