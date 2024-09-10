import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicCaseSettingsComponent } from './public-case-settings.component';

describe('PublicCaseSettingsComponent', () => {
  let component: PublicCaseSettingsComponent;
  let fixture: ComponentFixture<PublicCaseSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicCaseSettingsComponent]
    });
    fixture = TestBed.createComponent(PublicCaseSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
