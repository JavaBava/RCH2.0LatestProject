import { TestBed } from '@angular/core/testing';

import { AutheticationGuard } from './authetication.guard';

describe('AutheticationGuard', () => {
  let guard: AutheticationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AutheticationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
