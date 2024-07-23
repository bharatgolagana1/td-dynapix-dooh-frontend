import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutstandingPaymentsComponent } from './outstanding-payments.component';

describe('OutstandingPaymentsComponent', () => {
  let component: OutstandingPaymentsComponent;
  let fixture: ComponentFixture<OutstandingPaymentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OutstandingPaymentsComponent]
    });
    fixture = TestBed.createComponent(OutstandingPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
