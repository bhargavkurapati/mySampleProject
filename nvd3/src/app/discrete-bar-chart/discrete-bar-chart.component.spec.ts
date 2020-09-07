import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscreteBarChartComponent } from './discrete-bar-chart.component';

describe('DiscreteBarChartComponent', () => {
  let component: DiscreteBarChartComponent;
  let fixture: ComponentFixture<DiscreteBarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscreteBarChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscreteBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
