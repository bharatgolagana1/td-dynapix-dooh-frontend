import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSchedulerComponent } from './update-scheduler.component';

describe('UpdateSchedulerComponent', () => {
  let component: UpdateSchedulerComponent;
  let fixture: ComponentFixture<UpdateSchedulerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateSchedulerComponent]
    });
    fixture = TestBed.createComponent(UpdateSchedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
