import { HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
import { apiInterceptor } from './apiInterceptor';

// Mock Config import
// Mock Config import for Jasmine
const mockApiConfig = {
  apiUrlGutachten: 'http://real-gutachten/api/v1',
  apiUrlUser: 'http://real-user/api/v1',
  xUserId: 'test-user',
  xOrgId: 'test-org',
  xGutachterId: 'test-gutachter'
};
// If your apiInterceptor imports the config, you may need to mock the module system or refactor apiInterceptor to accept config as a parameter for easier testing.

describe('apiInterceptor', () => {
  let next: jasmine.Spy;
  let handler: HttpHandler;

  beforeEach(() => {
    next = jasmine.createSpy('next');
    handler = { handle: next } as any;
  });

  function makeRequest(url: string, headers?: { [key: string]: string }) {
    return new HttpRequest('GET', url, {
      headers: new HttpHeaders(headers)
    });
  }

  it('should add missing X-UserId, X-OrgId, X-GutachterId headers', () => {
    const req = makeRequest('http://localhost:8080/api/v1/test');
    apiInterceptor(req, next);
    const calledReq = next.calls.mostRecent().args[0];
    expect(calledReq.headers.get('X-UserId')).toBe('test-user');
    expect(calledReq.headers.get('X-OrgId')).toBe('test-org');
    expect(calledReq.headers.get('X-GutachterId')).toBe('test-gutachter');
  });

  it('should not overwrite existing headers', () => {
    const req = makeRequest('http://localhost:8080/api/v1/test', {
      'X-UserId': 'existing-user',
      'X-OrgId': 'existing-org',
      'X-GutachterId': 'existing-gutachter'
    });
    apiInterceptor(req, next);
    const calledReq = next.calls.mostRecent().args[0];
    expect(calledReq.headers.get('X-UserId')).toBe('existing-user');
    expect(calledReq.headers.get('X-OrgId')).toBe('existing-org');
    expect(calledReq.headers.get('X-GutachterId')).toBe('existing-gutachter');
  });

  it('should rewrite Gutachten API URL', () => {
    const req = makeRequest('http://localhost:8080/api/v1/test');
    apiInterceptor(req, next);
    const calledReq = next.calls.mostRecent().args[0];
    expect(calledReq.url).toBe('http://real-gutachten/api/v1/test');
  });

  it('should rewrite User API URL', () => {
    const req = makeRequest('http://localhost:9000/api/v1/user');
    apiInterceptor(req, next);
    const calledReq = next.calls.mostRecent().args[0];
    expect(calledReq.url).toBe('http://real-user/api/v1/user');
  });

  it('should not rewrite unrelated URLs', () => {
    const req = makeRequest('http://localhost:3000/other');
    apiInterceptor(req, next);
    const calledReq = next.calls.mostRecent().args[0];
    expect(calledReq.url).toBe('http://localhost:3000/other');
  });
});
