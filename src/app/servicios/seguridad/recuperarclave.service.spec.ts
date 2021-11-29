import { TestBed } from '@angular/core/testing';

import { RecuperarclaveService } from './recuperarclave.service';

describe('RecuperarclaveService', () => {
  let service: RecuperarclaveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecuperarclaveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
