import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatChartCalenderComponent } from './heat-chart-calender.component';

describe('HeatChartCalenderComponent', () => {
  let component: HeatChartCalenderComponent;
  let fixture: ComponentFixture<HeatChartCalenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeatChartCalenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeatChartCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
