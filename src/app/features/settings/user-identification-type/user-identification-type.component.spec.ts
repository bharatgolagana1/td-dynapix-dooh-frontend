import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserIdentificationTypeComponent } from './user-identification-type.component';

describe('UserIdentificationTypeComponent', () => {
  let component: UserIdentificationTypeComponent;
  let fixture: ComponentFixture<UserIdentificationTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserIdentificationTypeComponent]
    });
    fixture = TestBed.createComponent(UserIdentificationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
