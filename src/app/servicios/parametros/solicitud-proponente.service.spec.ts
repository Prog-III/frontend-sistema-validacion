import { TestBed } from '@angular/core/testing';

import { SolicitudProponenteService } from './solicitud-proponente.service';

describe('SolicitudProponenteService', () => {
  let service: SolicitudProponenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitudProponenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
