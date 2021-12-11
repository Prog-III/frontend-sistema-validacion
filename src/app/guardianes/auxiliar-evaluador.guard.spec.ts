import { TestBed } from '@angular/core/testing';

import { AuxiliarEvaluadorGuard } from './auxiliar-evaluador.guard';

describe('AuxiliarEvaluadorGuard', () => {
  let guard: AuxiliarEvaluadorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuxiliarEvaluadorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
