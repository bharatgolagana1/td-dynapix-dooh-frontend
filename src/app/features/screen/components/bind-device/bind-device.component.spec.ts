import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BindDeviceComponent } from './bind-device.component';

describe('BindDeviceComponent', () => {
  let component: BindDeviceComponent;
  let fixture: ComponentFixture<BindDeviceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BindDeviceComponent]
    });
    fixture = TestBed.createComponent(BindDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
