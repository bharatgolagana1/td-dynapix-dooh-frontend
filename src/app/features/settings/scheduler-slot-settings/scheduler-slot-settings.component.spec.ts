import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulerSlotSettingsComponent } from './scheduler-slot-settings.component';

describe('SchedulerSlotSettingsComponent', () => {
  let component: SchedulerSlotSettingsComponent;
  let fixture: ComponentFixture<SchedulerSlotSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchedulerSlotSettingsComponent]
    });
    fixture = TestBed.createComponent(SchedulerSlotSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
