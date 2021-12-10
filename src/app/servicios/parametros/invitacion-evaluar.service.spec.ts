import { TestBed } from '@angular/core/testing';

import { InvitacionEvaluarService } from './invitacion-evaluar.service';

describe('InvitacionEvaluarService', () => {
  let service: InvitacionEvaluarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvitacionEvaluarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
