import { TestBed } from '@angular/core/testing';

import { JuradoLineaInvestigacionService } from './jurado-linea-investigacion.service';

describe('JuradoLineaInvestigacionService', () => {
  let service: JuradoLineaInvestigacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JuradoLineaInvestigacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
