import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboChartsComponent } from './combo-charts.component';

describe('ComboChartsComponent', () => {
  let component: ComboChartsComponent;
  let fixture: ComponentFixture<ComboChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComboChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
