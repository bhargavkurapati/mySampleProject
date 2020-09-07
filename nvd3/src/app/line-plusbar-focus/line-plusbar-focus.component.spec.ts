import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinePlusbarFocusComponent } from './line-plusbar-focus.component';

describe('LinePlusbarFocusComponent', () => {
  let component: LinePlusbarFocusComponent;
  let fixture: ComponentFixture<LinePlusbarFocusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinePlusbarFocusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinePlusbarFocusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
