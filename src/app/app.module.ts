import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { GraphexpModule } from './modules/graphexp/graphexp.module';
import { GraphexpService } from './modules/graphexp/graphexp.service';
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
