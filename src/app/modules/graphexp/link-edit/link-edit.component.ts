import { GremlinLink } from '../nodes/gremlinLink';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'sv-link-edit',
  templateUrl: './link-edit.component.html',
  styleUrls: ['./link-edit.component.css']
})
export class LinkEditComponent implements OnInit {

  createProperty() {
    this.data.item.properties.push({key: '', value: ''});
  }

  constructor(
    public dialogRef: MatDialogRef<LinkEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}


  ngOnInit() {
  }

}
