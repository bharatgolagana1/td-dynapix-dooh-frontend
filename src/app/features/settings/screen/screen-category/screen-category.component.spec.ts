import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenCategoryComponent } from './screen-category.component';

describe('ScreenCategoryComponent', () => {
  let component: ScreenCategoryComponent;
  let fixture: ComponentFixture<ScreenCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScreenCategoryComponent]
    });
    fixture = TestBed.createComponent(ScreenCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
