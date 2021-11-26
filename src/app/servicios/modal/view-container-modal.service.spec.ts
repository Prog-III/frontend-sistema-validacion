import { TestBed } from '@angular/core/testing';

import { ViewContainerModalService } from './view-container-modal.service';

describe('ViewContainerModalService', () => {
  let service: ViewContainerModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewContainerModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
