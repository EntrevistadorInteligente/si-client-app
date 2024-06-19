import { TestBed } from '@angular/core/testing';

import { ErrorserviceService } from './errorservice.service';

describe('ErrorserviceService', () => {
  let service: ErrorserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
