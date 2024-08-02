import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulerSettingsComponent } from './scheduler-settings.component';

describe('SchedulerSettingsComponent', () => {
  let component: SchedulerSettingsComponent;
  let fixture: ComponentFixture<SchedulerSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchedulerSettingsComponent]
    });
    fixture = TestBed.createComponent(SchedulerSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
