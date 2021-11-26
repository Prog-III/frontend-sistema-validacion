import { TestBed } from '@angular/core/testing';

import { ViewContainerToastService } from './view-container-toast.service';

describe('ViewContainerToastService', () => {
  let service: ViewContainerToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewContainerToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
