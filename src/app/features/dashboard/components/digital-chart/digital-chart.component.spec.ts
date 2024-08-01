import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalChartComponent } from './digital-chart.component';

describe('DigitalChartComponent', () => {
  let component: DigitalChartComponent;
  let fixture: ComponentFixture<DigitalChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DigitalChartComponent]
    });
    fixture = TestBed.createComponent(DigitalChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
