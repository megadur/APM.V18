import { TestBed } from '@angular/core/testing';

import { ConfigZodService } from './config-zod.service';

describe('ConfigZodService', () => {
  let service: ConfigZodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigZodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
