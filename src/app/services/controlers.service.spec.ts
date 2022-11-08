import { TestBed } from '@angular/core/testing';

import { ControlersService } from './controlers.service';

describe('ControlersService', () => {
  let service: ControlersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
