import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CumulativeLineChartComponent } from './cumulative-line-chart.component';

describe('CumulativeLineChartComponent', () => {
  let component: CumulativeLineChartComponent;
  let fixture: ComponentFixture<CumulativeLineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CumulativeLineChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CumulativeLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
