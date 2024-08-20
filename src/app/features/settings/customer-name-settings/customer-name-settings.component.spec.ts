import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerNameSettingsComponent } from './customer-name-settings.component';

describe('CustomerNameSettingsComponent', () => {
  let component: CustomerNameSettingsComponent;
  let fixture: ComponentFixture<CustomerNameSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerNameSettingsComponent]
    });
    fixture = TestBed.createComponent(CustomerNameSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
