import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicCasesListComponent } from './public-cases-list.component';

describe('PublicCasesListComponent', () => {
  let component: PublicCasesListComponent;
  let fixture: ComponentFixture<PublicCasesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicCasesListComponent]
    });
    fixture = TestBed.createComponent(PublicCasesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
