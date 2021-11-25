import { TestBed } from '@angular/core/testing';

import { LineaInvestigacionService } from './linea-investigacion.service';

describe('LineaInvestigacionServiceService', () => {
  let service: LineaInvestigacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LineaInvestigacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
