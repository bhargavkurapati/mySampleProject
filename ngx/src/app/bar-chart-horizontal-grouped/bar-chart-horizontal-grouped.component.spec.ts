import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarChartHorizontalGroupedComponent } from './bar-chart-horizontal-grouped.component';

describe('BarChartHorizontalGroupedComponent', () => {
  let component: BarChartHorizontalGroupedComponent;
  let fixture: ComponentFixture<BarChartHorizontalGroupedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarChartHorizontalGroupedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarChartHorizontalGroupedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
