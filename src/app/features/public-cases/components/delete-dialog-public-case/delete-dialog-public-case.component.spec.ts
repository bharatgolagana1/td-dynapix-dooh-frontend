import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDialogPublicCaseComponent } from './delete-dialog-public-case.component';

describe('DeleteDialogPublicCaseComponent', () => {
  let component: DeleteDialogPublicCaseComponent;
  let fixture: ComponentFixture<DeleteDialogPublicCaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteDialogPublicCaseComponent]
    });
    fixture = TestBed.createComponent(DeleteDialogPublicCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
