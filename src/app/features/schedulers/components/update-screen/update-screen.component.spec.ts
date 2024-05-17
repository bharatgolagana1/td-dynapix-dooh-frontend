import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateScreenComponent } from './update-screen.component';

describe('UpdateScreenComponent', () => {
  let component: UpdateScreenComponent;
  let fixture: ComponentFixture<UpdateScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateScreenComponent]
    });
    fixture = TestBed.createComponent(UpdateScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
