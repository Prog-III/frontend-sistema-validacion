import { TestBed } from '@angular/core/testing';

import { ProponenteDepartamentoService } from './proponente-departamento.service';

describe('ProponenteDepartamentoService', () => {
  let service: ProponenteDepartamentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProponenteDepartamentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
