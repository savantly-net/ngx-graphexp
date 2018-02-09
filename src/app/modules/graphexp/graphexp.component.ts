import { ConnectionCreatedEvent } from './graphViz/ConnectionCreatedEvent';
import {GraphConfig} from './graphViz/graphConfig';
import {GraphViz} from './graphViz/graphViz';
import {GraphexpService, GraphsonFormat} from './graphexp.service';
import { LinkEditComponent } from './link-edit/link-edit.component';
import {NodeEditComponent} from './node-edit/node-edit.component';
import {D3Node} from './nodes/d3Node';
import { GremlinLink } from './nodes/gremlinLink';
import {GremlinNode} from './nodes/gremlinNode';
import {Component, OnInit, Input, ViewEncapsulation} from '@angular/core';
import {MatDialog} from '@angular/material';
import {GremlinService, GremlinClientOptions, GremlinQuery} from '@savantly/gremlin-js';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import * as d3 from 'd3';


@Component({
  selector: 'sv-graphexp',
  templateUrl: './graphexp.component.html',
  styleUrls: ['./graphexp.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GraphexpComponent implements OnInit {

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
  get enableEdit() {
    return (this.graphConfig && this.graphConfig.enableEdit);
  }
  get nodeLabels() {
    return this.graphConfig.nodeLabels;
  }
  get linkLabels() {
    return this.graphConfig.linkLabels;
  }

  ngOnInit(): void {
    if (!this.graphConfig) {
      this.graphConfig = new GraphConfig();
    }
    this.graphViz = new GraphViz(this.graphexpService, this.graphConfig);
    setTimeout(() => {
      this.graphViz.init('#sv_graphexp');
      this.graphexpService.queryGraphInfo();

      this.graphViz.connectionCreated.subscribe((val: ConnectionCreatedEvent) => {
        console.log(`GraphexpComponent#ngAfterViewInit: connection created ${val}`);
        const gremlinLink = new GremlinLink();
        gremlinLink.source = val.source.id;
        gremlinLink.target = val.target.id;
        this.openLinkEditDialog(gremlinLink);
      });

      this.graphViz.createNodeEvent.subscribe((d3Node: D3Node) => {
        if (d3Node === null) {
          return;
        }
        const gremlinNode = new GremlinNode();
        this.openNodeEditDialog(gremlinNode);
      });
    });

  }

  openLinkEditDialog(item: GremlinLink) {
    const dialogRef = this.dialog.open(LinkEditComponent, {
      width: '30em',
      data: {labels: this.linkLabels, item: item}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.createLink(result);
      }
    });
  }

  openNodeEditDialog(item?: GremlinNode) {
    item = item || new GremlinNode();
    const dialogRef = this.dialog.open(NodeEditComponent, {
      width: '30em',
      data: {labels: this.nodeLabels, item: item}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.createNode(result);
      }
    });
  }

  createLink(data: GremlinLink) {
    this.graphexpService.createLink(data).then(tinkerNode => {
      console.log(data);
    }, err => {console.error(err)});
  }

  createNode(data: GremlinNode) {
    this.graphexpService.createNode(data.label, data.properties).then(tinkerNode => {
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
      const valArray = node.properties[prop];
      const val = valArray[0]['value'];
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

  constructor(public dialog: MatDialog) {}

}
