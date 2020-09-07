import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinAndCosComponent } from './sin-and-cos.component';

describe('SinAndCosComponent', () => {
  let component: SinAndCosComponent;
  let fixture: ComponentFixture<SinAndCosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinAndCosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinAndCosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
