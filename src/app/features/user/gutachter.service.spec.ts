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
  let userserviceClientSpy: jasmine.SpyObj<UserserviceApiClient>;

  const mockGutachter: GutachterDto = {
    id: 1,
    name: { nachname: 'Test Gutachter', vorname: 'Max' },
    zuordnung: [],
    organisation: {
      orgId: '1',
      adresse: {},
      name: 'Test Organisation',
    },
    lanr: '123456789',
    rolle: ['gutachter'],
    kontakt: {
      typ: 'Email',
      wert: '',
      anmerkung: '',
    },
    fachrichtung: undefined,
    adressen: [],
    nutzerstatus: 'angelegt',
  } as GutachterDto;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('UserserviceApiClient', ['getUserInfo']);
    TestBed.configureTestingModule({
      providers: [
        GutachterService,
        { provide: UserserviceApiClient, useValue: spy },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    // Patch the spy to have the correct return type for getUserInfo
    (spy.getUserInfo as jasmine.Spy).and.returnValue(of(mockGutachter));
    service = TestBed.inject(GutachterService);
    userserviceClientSpy = TestBed.inject(
      UserserviceApiClient,
    ) as jasmine.SpyObj<UserserviceApiClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load and cache GutachterDto', async () => {
    // The spy's return value is already set in beforeEach
    const result = await service.loadGutachter();
    expect(userserviceClientSpy.getUserInfo).toHaveBeenCalledWith('gutachter');
    expect(result).toEqual(mockGutachter);
    expect(service.getCurrentGutachter()).toEqual(mockGutachter);
  });

  it('should return null if no GutachterDto is cached', () => {
    expect(service.getCurrentGutachter()).toBeNull();
  });
  it('should clear the cached GutachterDto', async () => {
    // The spy's return value is already set in beforeEach
    await service.loadGutachter();
    expect(service.getCurrentGutachter()).toEqual(mockGutachter);
    service.clearCurrentGutachter();
    expect(service.getCurrentGutachter()).toBeNull();
  });
});
