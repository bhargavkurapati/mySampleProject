import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineFishEyeComponent } from './line-fish-eye.component';

describe('LineFishEyeComponent', () => {
  let component: LineFishEyeComponent;
  let fixture: ComponentFixture<LineFishEyeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineFishEyeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineFishEyeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
