import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NormlizdAreaChartComponent } from './normlizd-area-chart.component';

describe('NormlizdAreaChartComponent', () => {
  let component: NormlizdAreaChartComponent;
  let fixture: ComponentFixture<NormlizdAreaChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NormlizdAreaChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NormlizdAreaChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
