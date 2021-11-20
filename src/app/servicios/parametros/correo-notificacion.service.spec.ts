import { TestBed } from '@angular/core/testing';

import { CorreoNotificacionService } from './correo-notificacion.service';

describe('CorreoNotificacionService', () => {
  let service: CorreoNotificacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorreoNotificacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
