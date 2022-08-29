import { TestBed } from '@angular/core/testing';

import { TvsService } from './tvs.service';

describe('TvsService', () => {
  let service: TvsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TvsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
