import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PieChartGridComponent } from './pie-chart-grid.component';

describe('PieChartGridComponent', () => {
  let component: PieChartGridComponent;
  let fixture: ComponentFixture<PieChartGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PieChartGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PieChartGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
