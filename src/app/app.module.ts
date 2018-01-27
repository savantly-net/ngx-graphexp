import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MenuModule } from './modules/menu';
import { SecurityModule, ISecurityService, SecurityMockService } from '@savantly/ngx-security';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [];


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    SecurityModule,
    MenuModule.forRoot()
  ],
  providers: [{
    provide: ISecurityService,
    useClass: SecurityMockService
  }],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {
    console.log('Constructed AppModule');
  }
}
