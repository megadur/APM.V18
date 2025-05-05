import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { UserService } from './user.service';
import {
  GetUserInfo200Response,
  GutachterDto,
  UserserviceClient,
} from '../../../../generated/userservice-client';
import { HttpResponse, HttpHeaders, HttpEventType } from '@angular/common/http';

describe('UserService', () => {
  let service: UserService;
  let mockUserserviceClient: jasmine.SpyObj<UserserviceClient>;

  beforeEach(() => {
    mockUserserviceClient = jasmine.createSpyObj('UserserviceClient', [
      'getUserInfo',
    ]);

    TestBed.configureTestingModule({
      providers: [
        UserService,
        { provide: UserserviceClient, useValue: mockUserserviceClient },
      ],
    });

    service = TestBed.inject(UserService);
  });

  fit('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('onInit', () => {
    it('should call getUserInfo and log the response', () => {
      spyOn(console, 'log');
      const mockResponse: HttpResponse<GetUserInfo200Response> = {
        body: {} as GutachterDto,
        headers: new HttpHeaders(),
        status: 200,
        statusText: 'OK',
        url: null,
        clone: jasmine.createSpy(),
        type: HttpEventType.Response,
        ok: true,
      };
      mockUserserviceClient.getUserInfo.and.returnValue(of(mockResponse));

      service.onInit();

      expect(mockUserserviceClient.getUserInfo).toHaveBeenCalledWith(
        'gutachter',
      );
      expect(console.log).toHaveBeenCalledWith('UserService', mockResponse);
    });
  });

  describe('getUser', () => {
    it('should return user data when getUserInfo succeeds', () => {
      const mockResponse: HttpResponse<GetUserInfo200Response> = {
        body: {} as GutachterDto,
        headers: new HttpHeaders(),
        status: 200,
        statusText: 'OK',
        url: null,
        clone: jasmine.createSpy(),
        type: HttpEventType.Response,
        ok: false,
      };
      mockUserserviceClient.getUserInfo.and.returnValue(of(mockResponse));

      const result = service.getUser();

      expect(mockUserserviceClient.getUserInfo).toHaveBeenCalledWith(
        'gutachter',
        undefined,
      );
      expect(result).toEqual(mockResponse.body);
    });

    it('should throw an error when getUserInfo fails', () => {
      const mockError = new Error('Failed to fetch user info');
      spyOn(console, 'error');
      mockUserserviceClient.getUserInfo.and.returnValue(
        throwError(() => mockError),
      );

      expect(() => service.getUser()).toThrow(mockError);
      expect(console.error).toHaveBeenCalledWith(
        'Error fetching getUserInfo:',
        mockError,
      );
    });
  });
});
