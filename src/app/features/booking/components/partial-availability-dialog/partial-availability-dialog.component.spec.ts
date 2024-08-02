import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartialAvailabilityDialogComponent } from './partial-availability-dialog.component';

describe('PartialAvailabilityDialogComponent', () => {
  let component: PartialAvailabilityDialogComponent;
  let fixture: ComponentFixture<PartialAvailabilityDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartialAvailabilityDialogComponent]
    });
    fixture = TestBed.createComponent(PartialAvailabilityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
