import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import {
  UserserviceApiClient,
  GutachterDto,
} from '../../../generated/userservice-client';
import { GutachterService } from './gutachter.service';
import { createGutachterDto } from './createGutachterDto';

describe('GutachterService', () => {
  let service: GutachterService;
  let userserviceClientSpy: jasmine.SpyObj<UserserviceApiClient>;
  const mockGutachter: GutachterDto = createGutachterDto();

  beforeEach(() => {
    const spy = jasmine.createSpyObj('UserserviceApiClient', ['getUserInfo']);
    (spy.getUserInfo as jasmine.Spy).and.returnValue(of(mockGutachter));
    TestBed.configureTestingModule({
      providers: [
        GutachterService,
        { provide: UserserviceApiClient, useValue: spy },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(GutachterService);
    userserviceClientSpy = TestBed.inject(
      UserserviceApiClient,
    ) as jasmine.SpyObj<UserserviceApiClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load and cache GutachterDto', async () => {
    const result = await service.loadGutachter();
    expect(userserviceClientSpy.getUserInfo).toHaveBeenCalledWith('gutachter');
    expect(result).toEqual(mockGutachter);
    expect(service.getCurrentGutachter()).toEqual(mockGutachter);
  });

  it('should return null if no GutachterDto is cached', () => {
    expect(service.getCurrentGutachter()).toBeNull();
  });

  it('should clear the cached GutachterDto', async () => {
    await service.loadGutachter();
    expect(service.getCurrentGutachter()).toEqual(mockGutachter);
    service.clearCurrentGutachter();
    expect(service.getCurrentGutachter()).toBeNull();
  });
});
