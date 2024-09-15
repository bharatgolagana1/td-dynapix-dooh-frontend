import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateRangePickerDialogComponent } from './date-range-picker-dialog.component';

describe('DateRangePickerDialogComponent', () => {
  let component: DateRangePickerDialogComponent;
  let fixture: ComponentFixture<DateRangePickerDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DateRangePickerDialogComponent]
    });
    fixture = TestBed.createComponent(DateRangePickerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
