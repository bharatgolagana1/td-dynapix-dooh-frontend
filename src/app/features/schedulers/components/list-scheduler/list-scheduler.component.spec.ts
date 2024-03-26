import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSchedulerComponent } from './list-scheduler.component';

describe('ListSchedulerComponent', () => {
  let component: ListSchedulerComponent;
  let fixture: ComponentFixture<ListSchedulerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListSchedulerComponent]
    });
    fixture = TestBed.createComponent(ListSchedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
