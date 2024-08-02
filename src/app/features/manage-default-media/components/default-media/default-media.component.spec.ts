import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultMediaComponent } from './default-media.component';

describe('DefaultMediaComponent', () => {
  let component: DefaultMediaComponent;
  let fixture: ComponentFixture<DefaultMediaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DefaultMediaComponent]
    });
    fixture = TestBed.createComponent(DefaultMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
