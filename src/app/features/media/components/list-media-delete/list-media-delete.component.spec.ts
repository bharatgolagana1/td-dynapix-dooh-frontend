import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMediaDeleteComponent } from './list-media-delete.component';

describe('ListMediaDeleteComponent', () => {
  let component: ListMediaDeleteComponent;
  let fixture: ComponentFixture<ListMediaDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListMediaDeleteComponent]
    });
    fixture = TestBed.createComponent(ListMediaDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
