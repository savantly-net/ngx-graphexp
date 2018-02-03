import { GraphViz } from './graphViz';
import * as d3 from 'd3';

export class GraphLayers {
  // Submodule that handles layers of visualization

  nb_layers = 3;
  old_Nodes = [];
  old_Links = [];
  _Nodes = [];
  _Links = [];

  set_nb_layers(nb) {
    this.nb_layers = nb;
  }

  depth() {
    return this.nb_layers;
  }

  get nodes() {
    return this._Nodes;
  }
  get links() {
    return this._Links;
  }

  get _svg() {
    return this.graphViz._svg;
  }

  push_layers() {
    // old links and nodes become older
    // and are moved to the next deeper layer
    for (let k = this.nb_layers; k > 0; k--) {
      const kp = k - 1;
      this._svg.selectAll('.old_edge' + kp).classed('old_edge' + k, true);
      this._svg.selectAll('.old_node' + kp).classed('old_node' + k, true);
      this._svg.selectAll('.old_edgepath' + kp).classed('old_edgepath' + k, true);
      this._svg.selectAll('.old_edgelabel' + kp).classed('old_edgelabel' + k, true);
    };
  }

  clear_old() {
    this.old_Nodes = [];
    this.old_Links = [];
  }

  update_data(d: {nodes: any[], links: any[] }) {
    // Save the data
    const previous_nodes = this._svg.selectAll('g').filter('.active_node');
    const previous_nodes_data = previous_nodes.data();
    this.old_Nodes = this.updateAdd(this.old_Nodes, previous_nodes_data);
    const previous_links = this._svg.selectAll('.active_edge');
    const previous_links_data = previous_links.data();
    this.old_Links = this.updateAdd(this.old_Links, previous_links_data);

    // handle the pinned nodes
    const pinned_Nodes = this._svg.selectAll('g').filter('.pinned');
    const pinned_nodes_data = pinned_Nodes.data();

      // get the node data and merge it with the pinned nodes
    this._Nodes = d.nodes;
    this._Nodes = this.updateAdd(this._Nodes, pinned_nodes_data);
    // add coordinates to the new active nodes that already existed in the previous step
    this._Nodes = this.transfer_coordinates(this._Nodes, this.old_Nodes);
    // retrieve the links between nodes and pinned nodes
    this._Links = d.links.concat(previous_links_data); // first gather the links
    this._Links = this.find_active_links(this._Links, this._Nodes); // then find the ones that are between active nodes

  }

  updateAdd(array1, array2) {
    // Update lines of array1 with the ones of array2 when the elements' id match
    // and add elements of array2 to array1 when they do not exist in array1
    const arraytmp = array2.slice(0);
    const removeValFromIndex = [];
    array1.forEach((d, index, thearray) => {
      for (let i = 0; i < arraytmp.length; i++) {
        if (d.id === arraytmp[i].id) {
          thearray[index] = arraytmp[i];
          removeValFromIndex.push(i);
        }
      }
    });
    // remove the already updated values (in reverse order, not to mess up the indices)
    removeValFromIndex.sort();
    for (let i = removeValFromIndex.length - 1; i >= 0; i--) {
      arraytmp.splice(removeValFromIndex[i], 1);
    }
    return array1.concat(arraytmp);
  }

  find_active_links(list_of_links, active_nodes) {
    // find the links in the list_of_links that are between the active nodes and discard the others
    let active_links = [];
    list_of_links.forEach((row) => {
      for (let i = 0; i < active_nodes.length; i++) {
        for (let j = 0; j < active_nodes.length; j++) {
          if (active_nodes[i].id === row.source.id && active_nodes[j].id === row.target.id) {
            let L_data = {source: row.source.id, target: row.target.id, type: row.type, value: row.value, id: row.id};
            L_data = row;
            L_data['source'] = row.source.id;
            L_data['target'] = row.target.id;
            active_links = active_links.concat(L_data);
          } else if (active_nodes[i].id === row.source && active_nodes[j].id === row.target) {
            const L_data = row;
            active_links = active_links.concat(L_data);
          }
        }
      }
    });
    // the active links are in active_links but there can be some duplicates
    // remove duplicates links
    const dic = {};
    for (let i = 0; i < active_links.length; i++) {
      dic[active_links[i].id] = active_links[i]; // this will remove the duplicate links (with same id)
    }
    const list_of_active_links = [];
    for (const key of Object.keys(dic)) {
      list_of_active_links.push(dic[key]);
    }
    return list_of_active_links;
  }


  transfer_coordinates(Nodes, old_Nodes) {
    // Transfer coordinates from old_nodes to the new nodes with the same id
    for (let i = 0; i < old_Nodes.length; i++) {
      const exists = 0;
      for (let j = 0; j < Nodes.length; j++) {
        if (Nodes[j].id === old_Nodes[i].id) {
          Nodes[j].x = old_Nodes[i].x;
          Nodes[j].y = old_Nodes[i].y;
          Nodes[j].fx = old_Nodes[i].x;
          Nodes[j].fy = old_Nodes[i].y;
          Nodes[j].vx = old_Nodes[i].vx;
          Nodes[j].vy = old_Nodes[i].vy;
        }
      }
    }
    return Nodes;
  }

  remove_duplicates(elem_class, elem_class_old) {
    // Remove all the duplicate nodes and edges among the old_nodes and old_edges.
    // A node or an edge can not be on several layers at the same time.
    d3.selectAll(elem_class).each((d) => {
      const ID = d.id;
      for (let n = 0; n < this.nb_layers; n++) {
        const list_old_elements = d3.selectAll(elem_class_old + n);
        // list_old_nodes_data = list_old_nodes.data();
        list_old_elements.each((od) => {
          if (od.id === ID) {
            d3.select(this).remove();
            // console.log('Removed!!')
          }
        })
      }
    });
  }

  constructor(private graphViz: GraphViz) { }

}
