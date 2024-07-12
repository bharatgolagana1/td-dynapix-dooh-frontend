import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesMatrixComponent } from './roles-matrix.component';

describe('RolesMatrixComponent', () => {
  let component: RolesMatrixComponent;
  let fixture: ComponentFixture<RolesMatrixComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RolesMatrixComponent]
    });
    fixture = TestBed.createComponent(RolesMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
