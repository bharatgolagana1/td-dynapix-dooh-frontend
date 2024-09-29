import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionConfirmDailogComponent } from './transaction-confirm-dailog.component';

describe('TransactionConfirmDailogComponent', () => {
  let component: TransactionConfirmDailogComponent;
  let fixture: ComponentFixture<TransactionConfirmDailogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionConfirmDailogComponent]
    });
    fixture = TestBed.createComponent(TransactionConfirmDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
