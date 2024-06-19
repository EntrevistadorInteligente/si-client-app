import { TestBed } from '@angular/core/testing';

import { PreguntasService } from './preguntas.service';

describe('PreguntasService', () => {
  let service: PreguntasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreguntasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
