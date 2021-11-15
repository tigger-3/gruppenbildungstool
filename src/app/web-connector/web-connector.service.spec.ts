import { TestBed } from '@angular/core/testing';

import { WebConnectorService } from './web-connector.service';

describe('WebConnectorService', () => {
  let service: WebConnectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebConnectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
