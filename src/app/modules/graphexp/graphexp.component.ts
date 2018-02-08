import { GraphConfig } from './graphViz/graphConfig';
import {GraphViz} from './graphViz/graphViz';
import {GraphexpService, GraphsonFormat} from './graphexp.service';
import { D3Node } from './nodes/d3Node';
import {Component, OnInit, Input, AfterViewInit, ViewEncapsulation} from '@angular/core';
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
  graphConfig?: GraphConfig;

  public searchValue = '';
  public searchField = 'id';
  public graphInfoData: {};
  public numberOfLayers = 3;
  public showGraphInfo = true;
  public newNode: any = {};
  private graphViz: GraphViz;

  get selectedNode() {
    if (this.graphViz && this.graphViz.selectedNode && this.graphViz.selectedNode.value) {
      return this.graphViz.selectedNode.value;
    } else {
      return null;
    }
  }

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
    if (!this.graphConfig) {
      this.graphConfig = new GraphConfig();
    }
    this.graphViz = new GraphViz(this.graphexpService, this.graphConfig);
    this.graphViz.init('#sv_graphexp');
    this.graphexpService.queryGraphInfo();

    this.graphViz.connectionCreated.subscribe(val => {
      console.log(`GraphexpComponent#ngAfterViewInit: ${val}`);
    });
  }

  createNode() {
    const props = [];
    props.push({key: 'name', value: 'jeremy'});
    this.graphexpService.createNode('titan', props).then(data => {
    console.log(data);
    }, err => {console.error(err)});
  }

  search() {
    console.log(`searching field: ${this.searchField}, value: ${this.searchValue}`);
      this.graphexpService.queryNodes(this.searchField, this.searchValue).then(data => {
        this.graphViz.refreshData(data, 1, null);
      }).catch((err) => {
        console.error(err);
      });
  }

  getFlattenedNodeProperties(node: D3Node) {
    const props = [];
    for (const prop of Object.keys(node.properties)) {
      const val = JSON.stringify(node.properties[prop]);
      props.push({
        name: prop,
        value: val
      });
    }
    return props;
  }

  showNames() {
  }

  setNumberOfLayers() {
    this.graphConfig.numberOfLayers = this.numberOfLayers;
  }

  clearGraph() {
    this.graphViz.clear();
  }

  toggleGraphInfo() {
    this.showGraphInfo = !this.showGraphInfo;
  }

  getGraphInfo() {
    this.graphexpService.queryGraphInfo();
  }

  constructor() {}

}
