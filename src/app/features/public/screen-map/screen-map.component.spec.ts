import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenMapComponent } from './screen-map.component';

describe('ScreenMapComponent', () => {
  let component: ScreenMapComponent;
  let fixture: ComponentFixture<ScreenMapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScreenMapComponent]
    });
    fixture = TestBed.createComponent(ScreenMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
