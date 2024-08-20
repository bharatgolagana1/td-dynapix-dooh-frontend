import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMediaDialogComponent } from './upload-media-dialog.component';

describe('UploadMediaDialogComponent', () => {
  let component: UploadMediaDialogComponent;
  let fixture: ComponentFixture<UploadMediaDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadMediaDialogComponent]
    });
    fixture = TestBed.createComponent(UploadMediaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
