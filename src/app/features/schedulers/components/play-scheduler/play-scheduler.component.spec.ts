import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaySchedulerComponent } from './play-scheduler.component';

describe('PlaySchedulerComponent', () => {
  let component: PlaySchedulerComponent;
  let fixture: ComponentFixture<PlaySchedulerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlaySchedulerComponent]
    });
    fixture = TestBed.createComponent(PlaySchedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
