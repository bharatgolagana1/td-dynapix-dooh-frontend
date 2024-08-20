import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryOptionSettingsComponent } from './category-option-settings.component';

describe('CategoryOptionSettingsComponent', () => {
  let component: CategoryOptionSettingsComponent;
  let fixture: ComponentFixture<CategoryOptionSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryOptionSettingsComponent]
    });
    fixture = TestBed.createComponent(CategoryOptionSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
