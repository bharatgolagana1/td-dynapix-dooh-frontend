import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPublicCaseComponent } from './edit-public-case.component';

describe('EditPublicCaseComponent', () => {
  let component: EditPublicCaseComponent;
  let fixture: ComponentFixture<EditPublicCaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPublicCaseComponent]
    });
    fixture = TestBed.createComponent(EditPublicCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
