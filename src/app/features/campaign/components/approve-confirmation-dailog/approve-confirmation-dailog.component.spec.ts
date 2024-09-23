import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveConfirmationDailogComponent } from './approve-confirmation-dailog.component';

describe('ApproveConfirmationDailogComponent', () => {
  let component: ApproveConfirmationDailogComponent;
  let fixture: ComponentFixture<ApproveConfirmationDailogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApproveConfirmationDailogComponent]
    });
    fixture = TestBed.createComponent(ApproveConfirmationDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
