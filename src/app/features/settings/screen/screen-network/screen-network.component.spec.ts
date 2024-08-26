import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenNetworkComponent } from './screen-network.component';

describe('ScreenNetworkComponent', () => {
  let component: ScreenNetworkComponent;
  let fixture: ComponentFixture<ScreenNetworkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScreenNetworkComponent]
    });
    fixture = TestBed.createComponent(ScreenNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
