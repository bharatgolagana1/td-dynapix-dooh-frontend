import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateScreensComponent } from './create-screens.component';

describe('CreateScreensComponent', () => {
  let component: CreateScreensComponent;
  let fixture: ComponentFixture<CreateScreensComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateScreensComponent]
    });
    fixture = TestBed.createComponent(CreateScreensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
