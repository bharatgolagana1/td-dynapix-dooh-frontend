import { TestBed } from '@angular/core/testing';

import { DefaultMediaServiceService } from './default-media-service.service';

describe('DefaultMediaServiceService', () => {
  let service: DefaultMediaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultMediaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
