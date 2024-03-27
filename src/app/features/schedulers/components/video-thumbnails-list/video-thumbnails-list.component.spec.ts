import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoThumbnailsListComponent } from './video-thumbnails-list.component';

describe('VideoThumbnailsListComponent', () => {
  let component: VideoThumbnailsListComponent;
  let fixture: ComponentFixture<VideoThumbnailsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VideoThumbnailsListComponent]
    });
    fixture = TestBed.createComponent(VideoThumbnailsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
