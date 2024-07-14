import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { securityGuard } from './security.guard';

describe('securityGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => securityGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
