import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfulSubmissionComponent } from './successful-submission.component';

describe('SuccessfulSubmissionComponent', () => {
  let component: SuccessfulSubmissionComponent;
  let fixture: ComponentFixture<SuccessfulSubmissionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuccessfulSubmissionComponent]
    });
    fixture = TestBed.createComponent(SuccessfulSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
