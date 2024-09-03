import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageDialogPublicCaseComponent } from './image-dialog-public-case.component';

describe('ImageDialogPublicCaseComponent', () => {
  let component: ImageDialogPublicCaseComponent;
  let fixture: ComponentFixture<ImageDialogPublicCaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageDialogPublicCaseComponent]
    });
    fixture = TestBed.createComponent(ImageDialogPublicCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
