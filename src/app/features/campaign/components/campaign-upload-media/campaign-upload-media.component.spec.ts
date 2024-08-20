import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignUploadMediaComponent } from './campaign-upload-media.component';

describe('CampaignUploadMediaComponent', () => {
  let component: CampaignUploadMediaComponent;
  let fixture: ComponentFixture<CampaignUploadMediaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CampaignUploadMediaComponent]
    });
    fixture = TestBed.createComponent(CampaignUploadMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
