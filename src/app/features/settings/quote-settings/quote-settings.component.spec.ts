import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteSettingsComponent } from './quote-settings.component';

describe('QuoteSettingsComponent', () => {
  let component: QuoteSettingsComponent;
  let fixture: ComponentFixture<QuoteSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuoteSettingsComponent]
    });
    fixture = TestBed.createComponent(QuoteSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
