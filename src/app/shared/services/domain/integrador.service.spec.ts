import { TestBed } from '@angular/core/testing';

import { IntegradorService } from './integrador.service';

describe('IntegradorService', () => {
  let service: IntegradorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntegradorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
