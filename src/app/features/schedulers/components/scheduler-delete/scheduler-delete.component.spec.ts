import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulerDeleteComponent } from './scheduler-delete.component';

describe('SchedulerDeleteComponent', () => {
  let component: SchedulerDeleteComponent;
  let fixture: ComponentFixture<SchedulerDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchedulerDeleteComponent]
    });
    fixture = TestBed.createComponent(SchedulerDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
