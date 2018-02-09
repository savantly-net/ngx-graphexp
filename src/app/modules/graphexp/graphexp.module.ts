export { GraphexpService } from './graphexp.service';
export { GraphConfig } from './graphViz/graphConfig';

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GraphexpComponent} from './graphexp.component';
import {FormsModule} from '@angular/forms';
import {
  MatSidenavModule,
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatSelectModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatSliderModule,
  MatDialogModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import { NodeEditComponent } from './node-edit/node-edit.component';
import { LinkEditComponent } from './link-edit/link-edit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSliderModule,
    MatDialogModule,
    FlexLayoutModule
  ],
  declarations: [GraphexpComponent, NodeEditComponent, LinkEditComponent],
  entryComponents: [NodeEditComponent, LinkEditComponent],
  providers: [],
  exports: [
    GraphexpComponent,
    CommonModule,
    FormsModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSliderModule,
    MatDialogModule,
    FlexLayoutModule]
})
export class GraphexpModule {}
