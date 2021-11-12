import { TestBed } from '@angular/core/testing';

import { TeilnehmerService } from './teilnehmer.service';

describe('TeilnehmerService', () => {
  let service: TeilnehmerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeilnehmerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
