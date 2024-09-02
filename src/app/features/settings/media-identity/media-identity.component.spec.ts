import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaIdentityComponent } from './media-identity.component';

describe('MediaIdentityComponent', () => {
  let component: MediaIdentityComponent;
  let fixture: ComponentFixture<MediaIdentityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MediaIdentityComponent]
    });
    fixture = TestBed.createComponent(MediaIdentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
