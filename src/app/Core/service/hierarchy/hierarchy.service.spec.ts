import { TestBed } from '@angular/core/testing';

import { HierarchyService } from './hierarchy.service';

describe('HierarchyService', () => {
  let service: HierarchyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HierarchyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
