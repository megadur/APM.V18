import { HeaderComponent } from './header.component';
import { Router } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    // Clear sessionStorage before each test
    sessionStorage.clear();
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    // Patch inject to return our routerSpy
    spyOnProperty(HeaderComponent.prototype as any, 'router', 'get').and.returnValue(routerSpy);
    component = new HeaderComponent();
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it('should initialize with default values', () => {
    expect(component.keycloakStatus).toBeUndefined();
    expect(component.username).toBe('Dr. Mustermann');
    expect(component.authenticated).toBeFalse();
    expect(component.statusText).toBe('');
  });

  it('should login and update sessionStorage and properties', () => {
    component.authenticated = false;
    component.onButtonClickWelcome();
    expect(sessionStorage.getItem('loggedIn')).toBe('true');
    expect(sessionStorage.getItem('statusText')).toBe('Abmeldung in 15 Min');
    expect(component.authenticated).toBeTrue();
    expect(component.statusText).toBe('Abmeldung in 15 Min');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/welcome']);
  });

  it('should logout and update sessionStorage and properties', () => {
    sessionStorage.setItem('loggedIn', 'true');
    sessionStorage.setItem('statusText', 'Abmeldung in 15 Min');
    component.authenticated = true;
    component.onButtonClickWelcome();
    expect(sessionStorage.getItem('loggedIn')).toBe('false');
    expect(sessionStorage.getItem('statusText')).toBe('');
    expect(component.authenticated).toBeFalse();
    expect(component.statusText).toBe('');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should read authenticated and statusText from sessionStorage on creation', () => {
    sessionStorage.setItem('loggedIn', 'true');
    sessionStorage.setItem('statusText', 'Test Status');
    const newComponent = new HeaderComponent();
    expect(newComponent.authenticated).toBeTrue();
    expect(newComponent.statusText).toBe('Test Status');
  });
});
