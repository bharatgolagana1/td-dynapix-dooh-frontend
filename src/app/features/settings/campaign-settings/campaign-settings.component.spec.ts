import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaignSettingsComponent } from './campaign-settings.component';

describe('CompaignSettingsComponent', () => {
  let component: CompaignSettingsComponent;
  let fixture: ComponentFixture<CompaignSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompaignSettingsComponent]
    });
    fixture = TestBed.createComponent(CompaignSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
