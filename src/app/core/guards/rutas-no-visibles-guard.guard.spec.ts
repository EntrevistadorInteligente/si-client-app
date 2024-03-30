import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { rutasNoVisiblesGuardGuard } from './rutas-no-visibles-guard.guard';

describe('rutasNoVisiblesGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => rutasNoVisiblesGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
