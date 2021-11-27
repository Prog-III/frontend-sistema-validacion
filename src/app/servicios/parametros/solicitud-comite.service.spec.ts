import { TestBed } from '@angular/core/testing';

import { SolicitudComiteService } from './solicitud-comite.service';

describe('SolicitudComiteService', () => {
  let service: SolicitudComiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitudComiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
