import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { GraphexpModule, GraphexpService } from '@savantly/ngx-graphexp';
import { GremlinClientOptions } from '@savantly/gremlin-js';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [];

export const graphexpService = new GraphexpService(new GremlinClientOptions());


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    GraphexpModule
  ],
  providers: [{provide: GraphexpService, useValue: graphexpService}],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {
    console.log('Constructed AppModule');
  }
}
