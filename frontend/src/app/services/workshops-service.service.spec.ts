import { TestBed } from '@angular/core/testing';

import { WorkshopsServiceService } from './workshops-service.service';

describe('WorkshopsServiceService', () => {
  let service: WorkshopsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkshopsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
