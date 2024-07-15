import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteOrganizationComponent } from './delete-organization.component';

describe('DeleteOrganizationComponent', () => {
  let component: DeleteOrganizationComponent;
  let fixture: ComponentFixture<DeleteOrganizationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteOrganizationComponent]
    });
    fixture = TestBed.createComponent(DeleteOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
