import { GremlinNode } from '../nodes/gremlinNode';
import {Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'sv-node-edit',
  templateUrl: './node-edit.component.html',
  styleUrls: ['./node-edit.component.css']
})
export class NodeEditComponent implements OnInit {

  createProperty() {
    this.data.item.properties.push({key: '', value: ''});
  }

  constructor(
    public dialogRef: MatDialogRef<NodeEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {labels: string[], item: GremlinNode}) {}

  ngOnInit() {
  }

}
