import {GraphViz} from './graphViz';
import {GraphexpService, GraphsonFormat} from './graphexp.service';
import {Component, OnInit, Input, AfterViewInit, NgZone, ViewEncapsulation} from '@angular/core';
import {GremlinService, GremlinClientOptions, GremlinQuery} from '@savantly/gremlin-js';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import * as d3 from 'd3';


@Component({
  selector: 'sv-graphexp',
  templateUrl: './graphexp.component.html',
  styleUrls: ['./graphexp.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GraphexpComponent implements AfterViewInit {

  @Input()
  graphexpService: GraphexpService;
  @Input()
  graphsonFormat: GraphsonFormat = GraphsonFormat.GraphSON3;

  public searchValue = '';
  public searchField = 'id';
  public graphInfoData: {};
  public numberOfLayers = 3;
  private graphViz: GraphViz;


  get nodeNames() {
    return this.graphexpService.nodeNames;
  };
  get nodeProperties() {
    return this.graphexpService.nodeProperties;
  };
  get edgeProperties() {
    return this.graphexpService.edgeProperties;
  };

  ngAfterViewInit(): void {
    this.graphViz = new GraphViz(this.graphexpService, this.graphsonFormat);
    this.graphViz.init('#sv_graphexp');
    this.graphexpService.queryGraphInfo();
  }

  search() {
    this.zone.run(() => {
    });
    console.log(`searching field: ${this.searchField}, value: ${this.searchValue}`);
      this.graphexpService.queryNodes(this.searchField, this.searchValue).then(data => {
        this.graphViz.refresh_data(data, 1, null);
      }).catch((err) => {
        console.error(err);
      });
  }

  showNames() {
  }

  setNumberOfLayers() {
  }

  clearGraph() {

  }

  showGraphInfo() {}

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
    this.graphViz.colorize(value);

  }

  constructor(private zone: NgZone) {}

}
