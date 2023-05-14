import { TestBed } from '@angular/core/testing';

import { HttpPersistenceService } from './http-persistence.service';

describe('HttpPersistenceService', () => {
  let service: HttpPersistenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpPersistenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
