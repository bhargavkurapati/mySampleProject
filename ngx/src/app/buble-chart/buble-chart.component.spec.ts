import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BubleChartComponent } from './buble-chart.component';

describe('BubleChartComponent', () => {
  let component: BubleChartComponent;
  let fixture: ComponentFixture<BubleChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BubleChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BubleChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
