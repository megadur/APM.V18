import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { Router } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Clear sessionStorage before each test
    sessionStorage.clear();
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [HeaderComponent], // If it's a standalone component
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
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

    // Create a new component instance to test constructor behavior
    const newFixture = TestBed.createComponent(HeaderComponent);
    const newComponent = newFixture.componentInstance;

    expect(newComponent.authenticated).toBeTrue();
    expect(newComponent.statusText).toBe('Test Status');
  });
});
