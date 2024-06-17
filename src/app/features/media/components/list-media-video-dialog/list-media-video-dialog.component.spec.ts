import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMediaVideoDialogComponent } from './list-media-video-dialog.component';

describe('ListMediaVideoDialogComponent', () => {
  let component: ListMediaVideoDialogComponent;
  let fixture: ComponentFixture<ListMediaVideoDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListMediaVideoDialogComponent]
    });
    fixture = TestBed.createComponent(ListMediaVideoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
