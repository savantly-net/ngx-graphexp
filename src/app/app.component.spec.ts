import { TestBed, async } from '@angular/core/testing';
import { SecurityModule, SecurityMockService, ISecurityService } from '@savantly/ngx-security';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { provideRoutes } from '@angular/router';
import { MenuModule, MenuService, MenuComponent } from '@savantly/ngx-menu';

import { MatMenuModule, MatToolbarModule, MatButtonModule, MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import {APP_BASE_HREF} from '@angular/common';
import { AppModule } from './app.module';

export const menuServiceFactory = function(securityService: ISecurityService){
  return new MenuService(securityService);
};

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, MatMenuModule, MatToolbarModule, MatButtonModule, FlexLayoutModule,
        //AppModule,
        //SecurityModule.forRoot(new SecurityMockService()),
        MenuModule
      ],
      declarations: [AppComponent],
      providers: [
        provideRoutes([]),
        {provide: APP_BASE_HREF, useValue: '/'},
        {provide: ISecurityService, useClass: SecurityMockService},
        {provide: MenuService, useFactory: menuServiceFactory, deps: [ISecurityService]}],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
