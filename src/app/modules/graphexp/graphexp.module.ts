import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphexpComponent } from './graphexp.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [GraphexpComponent],
  exports: [GraphexpComponent ]
})
export class GraphexpModule { }
