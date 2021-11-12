import { TestBed } from '@angular/core/testing';

import { GruppeService } from './gruppe.service';

describe('GruppeService', () => {
  let service: GruppeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GruppeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
