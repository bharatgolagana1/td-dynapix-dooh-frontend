import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicCaseComponent } from './public-case.component';

describe('PublicCaseComponent', () => {
  let component: PublicCaseComponent;
  let fixture: ComponentFixture<PublicCaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicCaseComponent]
    });
    fixture = TestBed.createComponent(PublicCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
