import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulerFormComponentComponent } from './scheduler-form-component.component';

describe('SchedulerFormComponentComponent', () => {
  let component: SchedulerFormComponentComponent;
  let fixture: ComponentFixture<SchedulerFormComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchedulerFormComponentComponent]
    });
    fixture = TestBed.createComponent(SchedulerFormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
