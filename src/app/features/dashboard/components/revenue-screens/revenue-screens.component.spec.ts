import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueScreensComponent } from './revenue-screens.component';

describe('RevenueScreensComponent', () => {
  let component: RevenueScreensComponent;
  let fixture: ComponentFixture<RevenueScreensComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RevenueScreensComponent]
    });
    fixture = TestBed.createComponent(RevenueScreensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
