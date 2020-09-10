import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BhargavPaginationComponent } from './bhargav-pagination.component';

describe('BhargavPaginationComponent', () => {
  let component: BhargavPaginationComponent;
  let fixture: ComponentFixture<BhargavPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BhargavPaginationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BhargavPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
