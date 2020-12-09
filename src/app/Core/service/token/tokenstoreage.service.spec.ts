import { TestBed } from '@angular/core/testing';

import { TokenstoreageService } from './tokenstoreage.service';

describe('TokenstoreageService', () => {
  let service: TokenstoreageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenstoreageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
