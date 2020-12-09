import { TestBed } from '@angular/core/testing';

import { CalenderserviceService } from './calenderservice.service';

describe('CalenderserviceService', () => {
  let service: CalenderserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalenderserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
