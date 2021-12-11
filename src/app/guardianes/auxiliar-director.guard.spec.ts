import { TestBed } from '@angular/core/testing';

import { AuxiliarDirectorGuard } from './auxiliar-director.guard';

describe('AuxiliarDirectorGuard', () => {
  let guard: AuxiliarDirectorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuxiliarDirectorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
