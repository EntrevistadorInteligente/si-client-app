import { TestBed } from '@angular/core/testing';

import { MaximizeService } from './maximize.service';

describe('MaximizeService', () => {
  let service: MaximizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaximizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
