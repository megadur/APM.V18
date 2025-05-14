import { TestBed } from '@angular/core/testing';

import { GutachterService } from './gutachter.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {
  UserserviceApiClient,
  GutachterDto,
} from '../../../generated/userservice-client';
import { of } from 'rxjs';

describe('GutachterService', () => {
  let service: GutachterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(GutachterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('GutachterService', () => {
    let service: GutachterService;
    let userserviceClientSpy: jasmine.SpyObj<UserserviceApiClient>;

    const mockGutachter: GutachterDto = {
      id: 1,
      name: 'Test Gutachter',
      zuordnung: null,
      organisation: null,
      rolle: null,
      kontakt: null,
      fachrichtung: null,
      adressen: null,
      nutzerstatus: null,
    } as GutachterDto;

    beforeEach(() => {
      const spy = jasmine.createSpyObj('UserserviceApiClient', ['getUserInfo']);
      // Patch the spy to have the correct return type for getUserInfo
      (spy.getUserInfo as jasmine.Spy).and.returnValue(of(mockGutachter));
      TestBed.configureTestingModule({
        providers: [
          GutachterService,
          { provide: UserserviceApiClient, useValue: spy },
        ],
      });
      service = TestBed.inject(GutachterService);
      userserviceClientSpy = TestBed.inject(
        UserserviceApiClient,
      ) as jasmine.SpyObj<UserserviceApiClient>;
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
      it('should load and cache GutachterDto', async () => {
        // The spy's return value is already set in beforeEach
        const result = await service.loadGutachter();
        expect(userserviceClientSpy.getUserInfo).toHaveBeenCalledWith(
          'gutachter',
        );
        expect(result).toEqual(mockGutachter);
        expect(service.getCurrentGutachter()).toEqual(mockGutachter);
      });
      expect(service.getCurrentGutachter()).toEqual(mockGutachter);
    });

    it('should return null if no GutachterDto is cached', () => {
      expect(service.getCurrentGutachter()).toBeNull();
      it('should clear the cached GutachterDto', async () => {
        // The spy's return value is already set in beforeEach
        await service.loadGutachter();
        expect(service.getCurrentGutachter()).toEqual(mockGutachter);
        service.clearCurrentGutachter();
        expect(service.getCurrentGutachter()).toBeNull();
      });
      expect(service.getCurrentGutachter()).toBeNull();
    });
  });
});
