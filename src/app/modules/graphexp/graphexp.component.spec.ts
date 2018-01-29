import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphexpComponent } from './graphexp.component';

describe('GraphexpComponent', () => {
  let component: GraphexpComponent;
  let fixture: ComponentFixture<GraphexpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphexpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphexpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
