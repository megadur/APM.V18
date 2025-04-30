import { TestBed } from '@angular/core/testing';

import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import {
  AccountService,
  PermissionViewModel,
} from '../../../../generated/ArzQaWeb';
import {
  GutachterDto,
  UserserviceService,
} from '../../../../generated/userservice-client';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let accountServiceSpy: jasmine.SpyObj<AccountService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('AccountService', [
      'accountPermissionsGet',
    ]);

    TestBed.configureTestingModule({
      providers: [
        UserService,
        { provide: AccountService, useValue: spy },
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
      ],
    });

    // service = TestBed.inject(UserService);
    // accountServiceSpy = TestBed.inject(
    //   AccountService,
    // ) as jasmine.SpyObj<AccountService>;
  });

  it('should fetch user permissions successfully', async () => {
    const mockPermissions: PermissionViewModel[] = [
      { name: 'Permission1' },
      { name: 'Permission2' },
    ];
    accountServiceSpy.accountPermissionsGet.and.returnValue(
      of(new HttpResponse({ body: mockPermissions })),
    ); // Wrap in HttpResponse
    //Observable<HttpResponse<Array<PermissionViewModel>>>;
    const result = await service.getUser();
    console.log('result.body', result);
    console.log('mockPermissions', mockPermissions);
    expect(accountServiceSpy.accountPermissionsGet).toHaveBeenCalled();
    expect(result).toEqual(mockPermissions);
    expect(service.permissions).toEqual(mockPermissions);
  });

  it('should fetch user permissions successfully using getUser2', () => {
    const mockPermissions: PermissionViewModel[] = [
      { name: 'Permission1' },
      { name: 'Permission2' },
    ];
    accountServiceSpy.accountPermissionsGet.and.returnValue(
      of(new HttpResponse({ body: mockPermissions })),
    );

    const result = service.getUser2();

    expect(accountServiceSpy.accountPermissionsGet).toHaveBeenCalled();
    expect(result).toEqual(mockPermissions);
    expect(service.permissions).toEqual(mockPermissions);
  });

  it('should handle error when fetching user permissions using getUser2', () => {
    const mockError = new Error('Failed to fetch permissions');
    accountServiceSpy.accountPermissionsGet.and.throwError(mockError);

    expect(() => service.getUser2()).toThrow(mockError);
    expect(accountServiceSpy.accountPermissionsGet).toHaveBeenCalled();
  });
  it('should fetch user permissions successfully using stub', () => {
    const mockPermissions: PermissionViewModel[] = [
      { name: 'Permission1' },
      { name: 'Permission2' },
    ];
    const stubAccountService = {
      accountPermissionsGet: () =>
        of(new HttpResponse({ body: mockPermissions })),
    };

    TestBed.overrideProvider(AccountService, { useValue: stubAccountService });
    const stubbedService = TestBed.inject(UserService);

    const result = stubbedService.getUser2();

    expect(result).toEqual(mockPermissions);
    expect(stubbedService.permissions).toEqual(mockPermissions);
  });

  it('should handle error when fetching user permissions using stub', () => {
    const mockError = new Error('Failed to fetch permissions');
    const stubAccountService = {
      accountPermissionsGet: () => {
        throw mockError;
      },
    };

    TestBed.overrideProvider(AccountService, { useValue: stubAccountService });
    const stubbedService = TestBed.inject(UserService);

    expect(() => stubbedService.getUser2()).toThrow(mockError);
  });

  it('should call onInit and log user info', () => {
    const mockResponse = { name: 'Test User' };
    const userServiceSpy = jasmine.createSpyObj('UserserviceService', [
      'getUserInfo',
    ]);
    userServiceSpy.getUserInfo.and.returnValue(of(mockResponse));

    TestBed.overrideProvider(UserserviceService, { useValue: userServiceSpy });
    const stubbedService = TestBed.inject(UserService);

    spyOn(console, 'log');
    stubbedService.onInit();

    expect(userServiceSpy.getUserInfo).toHaveBeenCalledWith('gutachter');
    expect(console.log).toHaveBeenCalledWith('UserService', mockResponse);
  });

  it('should fetch user info using getUser1', () => {
    const mockResponse: GutachterDto = {
      name: { nachname: 'Test User', vorname: '' },
      lanr: '12345',
      zuordnung: [],
      test_rolle: '',
      organisation: { orgId: 'org123', adresse: {} },
      kontakt: { typ: 'Email', wert: '', anmerkung: '' },
      letzterLogin: { ipV4: '', loginTimestamp: '', userAgent: '' },
      nutzerstatus: 'angelegt',
      rollen: [],
      adressen: [],
    };
    const userServiceSpy = jasmine.createSpyObj('UserserviceService', [
      'getUserInfo',
    ]);
    userServiceSpy.getUserInfo.and.returnValue(of(mockResponse));

    TestBed.overrideProvider(UserserviceService, { useValue: userServiceSpy });
    const stubbedService = TestBed.inject(UserService);

    const result = stubbedService.getUser1();

    result.subscribe((data) => {
      expect(userServiceSpy.getUserInfo).toHaveBeenCalledWith('gutachter');
      expect(data).toEqual(mockResponse);
      expect(stubbedService.permissions).toEqual(mockResponse);
    });
  });

  it('should handle error in getUser1', () => {
    const mockError = new Error('Failed to fetch user info');
    const userServiceSpy = jasmine.createSpyObj('UserserviceService', [
      'getUserInfo',
    ]);
    userServiceSpy.getUserInfo.and.returnValue(of(mockError));

    TestBed.overrideProvider(UserserviceService, { useValue: userServiceSpy });
    const stubbedService = TestBed.inject(UserService);

    spyOn(console, 'error');
    stubbedService.getUser1();

    expect(userServiceSpy.getUserInfo).toHaveBeenCalledWith('gutachter');
    expect(console.error).toHaveBeenCalledWith(
      'Error fetching permissions:',
      mockError,
    );
  });
  it('should handle error when fetching user permissions using getUser', async () => {
    const mockError = new Error('Failed to fetch permissions');
    accountServiceSpy = TestBed.inject(
      AccountService,
    ) as jasmine.SpyObj<AccountService>;
    accountServiceSpy.accountPermissionsGet.and.throwError(mockError);
    service = TestBed.inject(UserService);

    try {
      await service.getUser();
      fail('Expected error to be thrown');
    } catch (error) {
      expect(accountServiceSpy.accountPermissionsGet).toHaveBeenCalled();
      expect(error).toBe(mockError);
    }
  });
  it('should handle error when fetching user permissions using getUser2', () => {
    const mockError = new Error('Failed to fetch permissions');
    accountServiceSpy = TestBed.inject(
      AccountService,
    ) as jasmine.SpyObj<AccountService>;
    accountServiceSpy.accountPermissionsGet.and.throwError(mockError);
    service = TestBed.inject(UserService);

    expect(() => service.getUser2()).toThrow(mockError);
  });
  it('should handle error when fetching user permissions', async () => {
    const mockError = new Error('Failed to fetch permissions');
    accountServiceSpy = TestBed.inject(
      AccountService,
    ) as jasmine.SpyObj<AccountService>;
    accountServiceSpy.accountPermissionsGet.and.throwError(mockError);
    service = TestBed.inject(UserService);

    try {
      await service.getUser();
      fail('Expected error to be thrown');
    } catch (error) {
      expect(accountServiceSpy.accountPermissionsGet).toHaveBeenCalled();
      expect(error).toBe(mockError);
    }
  });
});
