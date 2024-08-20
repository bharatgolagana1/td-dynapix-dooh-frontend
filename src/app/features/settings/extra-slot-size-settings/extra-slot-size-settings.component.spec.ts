import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraSlotSizeSettingsComponent } from './extra-slot-size-settings.component';

describe('ExtraSlotSizeSettingsComponent', () => {
  let component: ExtraSlotSizeSettingsComponent;
  let fixture: ComponentFixture<ExtraSlotSizeSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExtraSlotSizeSettingsComponent]
    });
    fixture = TestBed.createComponent(ExtraSlotSizeSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
