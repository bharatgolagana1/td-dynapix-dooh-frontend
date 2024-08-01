import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingsHistoryComponent } from './bookings-history.component';

describe('BookingsHistoryComponent', () => {
  let component: BookingsHistoryComponent;
  let fixture: ComponentFixture<BookingsHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookingsHistoryComponent]
    });
    fixture = TestBed.createComponent(BookingsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
