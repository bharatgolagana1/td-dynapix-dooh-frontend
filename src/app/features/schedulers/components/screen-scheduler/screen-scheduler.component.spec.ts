import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenSchedulerComponent } from './screen-scheduler.component';

describe('ScreenSchedulerComponent', () => {
  let component: ScreenSchedulerComponent;
  let fixture: ComponentFixture<ScreenSchedulerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScreenSchedulerComponent]
    });
    fixture = TestBed.createComponent(ScreenSchedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
