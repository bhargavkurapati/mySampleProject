import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinePlusBarComponent } from './line-plus-bar.component';

describe('LinePlusBarComponent', () => {
  let component: LinePlusBarComponent;
  let fixture: ComponentFixture<LinePlusBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinePlusBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinePlusBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
