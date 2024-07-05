import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusConfirmDailogComponent } from './status-confirm-dailog.component';

describe('StatusConfirmDailogComponent', () => {
  let component: StatusConfirmDailogComponent;
  let fixture: ComponentFixture<StatusConfirmDailogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatusConfirmDailogComponent]
    });
    fixture = TestBed.createComponent(StatusConfirmDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
