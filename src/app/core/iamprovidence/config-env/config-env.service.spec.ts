import { TestBed } from '@angular/core/testing';

import { ConfigEnvService } from './config-env.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ConfigEnvService', () => {
  let service: ConfigEnvService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ConfigEnvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
