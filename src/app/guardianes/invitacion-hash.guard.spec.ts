import { TestBed } from '@angular/core/testing';

import { InvitacionHashGuard } from './invitacion-hash.guard';

describe('InvitacionHashGuard', () => {
  let guard: InvitacionHashGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(InvitacionHashGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
