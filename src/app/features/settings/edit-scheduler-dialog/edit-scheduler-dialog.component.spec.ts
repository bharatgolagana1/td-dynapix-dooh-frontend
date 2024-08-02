import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSchedulerDialogComponent } from './edit-scheduler-dialog.component';

describe('EditSchedulerDialogComponent', () => {
  let component: EditSchedulerDialogComponent;
  let fixture: ComponentFixture<EditSchedulerDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditSchedulerDialogComponent]
    });
    fixture = TestBed.createComponent(EditSchedulerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
