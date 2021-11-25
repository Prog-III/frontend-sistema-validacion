import { TestBed } from '@angular/core/testing';

import { LineaInvestigacionServiceService } from './linea-investigacion-service';

describe('LineaInvestigacionServiceService', () => {
  let service: LineaInvestigacionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LineaInvestigacionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
