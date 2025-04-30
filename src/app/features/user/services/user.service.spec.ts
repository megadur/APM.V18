import { TestBed } from '@angular/core/testing';

import {
  HttpEvent,
  HttpResponse,
  provideHttpClient,
} from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import {
  AccountService,
  PermissionViewModel,
} from '../../../../generated/ArzQaWeb';
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
      ],
    });

    service = TestBed.inject(UserService);
    accountServiceSpy = TestBed.inject(
      AccountService,
    ) as jasmine.SpyObj<AccountService>;
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
  fit('should handle error when fetching user permissions', async () => {
    const mockError = new Error('Failed to fetch permissions');
    accountServiceSpy.accountPermissionsGet.and.throwError(mockError);

    try {
      await service.getUser();
      fail('Expected error to be thrown');
    } catch (error) {
      expect(accountServiceSpy.accountPermissionsGet).toHaveBeenCalled();
      expect(error).toBe(mockError);
    }
  });
});
