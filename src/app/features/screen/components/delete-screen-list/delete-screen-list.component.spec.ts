import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteScreenListComponent } from './delete-screen-list.component';

describe('DeleteScreenListComponent', () => {
  let component: DeleteScreenListComponent;
  let fixture: ComponentFixture<DeleteScreenListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteScreenListComponent]
    });
    fixture = TestBed.createComponent(DeleteScreenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
