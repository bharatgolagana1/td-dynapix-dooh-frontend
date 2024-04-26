import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateScreenComponent } from './create-screen.component';

describe('CreateScreenComponent', () => {
  let component: CreateScreenComponent;
  let fixture: ComponentFixture<CreateScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateScreenComponent]
    });
    fixture = TestBed.createComponent(CreateScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
