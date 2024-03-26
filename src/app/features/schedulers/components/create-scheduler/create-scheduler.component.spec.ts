import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSchedulerComponent } from './create-scheduler.component';

describe('CreateSchedulerComponent', () => {
  let component: CreateSchedulerComponent;
  let fixture: ComponentFixture<CreateSchedulerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateSchedulerComponent]
    });
    fixture = TestBed.createComponent(CreateSchedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
