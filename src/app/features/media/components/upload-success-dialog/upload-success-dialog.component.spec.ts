import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadSuccessDialogComponent } from './upload-success-dialog.component';

describe('UploadSuccessDialogComponent', () => {
  let component: UploadSuccessDialogComponent;
  let fixture: ComponentFixture<UploadSuccessDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadSuccessDialogComponent]
    });
    fixture = TestBed.createComponent(UploadSuccessDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
