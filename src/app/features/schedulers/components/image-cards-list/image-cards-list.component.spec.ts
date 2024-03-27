import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageCardsListComponent } from './image-cards-list.component';

describe('ImageCardsListComponent', () => {
  let component: ImageCardsListComponent;
  let fixture: ComponentFixture<ImageCardsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageCardsListComponent]
    });
    fixture = TestBed.createComponent(ImageCardsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
