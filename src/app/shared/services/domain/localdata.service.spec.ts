import { TestBed } from '@angular/core/testing';

import { LocaldataService } from './localdata.service';

describe('LocaldataService', () => {
  let service: LocaldataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocaldataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
