import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScatterPlusLineChartComponent } from './scatter-plus-line-chart.component';

describe('ScatterPlusLineChartComponent', () => {
  let component: ScatterPlusLineChartComponent;
  let fixture: ComponentFixture<ScatterPlusLineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScatterPlusLineChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScatterPlusLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
