import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerNotfoundComponent } from './server-notfound.component';

describe('ServerNotfoundComponent', () => {
  let component: ServerNotfoundComponent;
  let fixture: ComponentFixture<ServerNotfoundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServerNotfoundComponent]
    });
    fixture = TestBed.createComponent(ServerNotfoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
