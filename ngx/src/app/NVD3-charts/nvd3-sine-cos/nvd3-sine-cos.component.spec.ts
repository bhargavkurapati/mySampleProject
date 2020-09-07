import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Nvd3SineCosComponent } from './nvd3-sine-cos.component';

describe('Nvd3SineCosComponent', () => {
  let component: Nvd3SineCosComponent;
  let fixture: ComponentFixture<Nvd3SineCosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Nvd3SineCosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Nvd3SineCosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
