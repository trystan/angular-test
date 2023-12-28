import { TestBed } from '@angular/core/testing';

import { SessionRepositoryService } from './session-repository.service';

describe('SessionRepositoryService', () => {
  let service: SessionRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
