import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaChartsStackedComponent } from './area-charts-stacked.component';

describe('AreaChartsStackedComponent', () => {
  let component: AreaChartsStackedComponent;
  let fixture: ComponentFixture<AreaChartsStackedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaChartsStackedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaChartsStackedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
