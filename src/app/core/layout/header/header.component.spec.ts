import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HeaderComponent } from './header.component';
import { provideRouter } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;

  beforeEach(async () => {
    // Clear sessionStorage before each test
    sessionStorage.clear();

    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        provideRouter([
          { path: '', component: HeaderComponent },
          { path: 'welcome', component: HeaderComponent }
        ])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
  });

  afterEach(() => {
    // Clean up sessionStorage after each test
    sessionStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initial state', () => {
    it('should initialize with default values when no session storage', () => {
      fixture.detectChanges();

      expect(component.keycloakStatus).toBeUndefined();
      expect(component.username).toBe('Dr. Mustermann');
      expect(component.authenticated).toBe(false);
      expect(component.statusText).toBe('');
    });

    it('should initialize authenticated state from sessionStorage when logged in', () => {
      sessionStorage.setItem('loggedIn', 'true');
      sessionStorage.setItem('statusText', 'Abmeldung in 15 Min');

      const newFixture = TestBed.createComponent(HeaderComponent);
      const newComponent = newFixture.componentInstance;

      expect(newComponent.authenticated).toBe(true);
      expect(newComponent.statusText).toBe('Abmeldung in 15 Min');
    });

    it('should initialize authenticated state from sessionStorage when logged out', () => {
      sessionStorage.setItem('loggedIn', 'false');
      sessionStorage.setItem('statusText', '');

      const newFixture = TestBed.createComponent(HeaderComponent);
      const newComponent = newFixture.componentInstance;

      expect(newComponent.authenticated).toBe(false);
      expect(newComponent.statusText).toBe('');
    });

    it('should handle missing statusText in sessionStorage', () => {
      sessionStorage.setItem('loggedIn', 'true');
      // Don't set statusText

      const newFixture = TestBed.createComponent(HeaderComponent);
      const newComponent = newFixture.componentInstance;

      expect(newComponent.authenticated).toBe(true);
      expect(newComponent.statusText).toBe('');
    });
  });

  describe('onButtonClickWelcome', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should login user when not authenticated', () => {
      // Arrange
      component.authenticated = false;

      // Act
      component.onButtonClickWelcome();

      // Assert
      expect(sessionStorage.getItem('loggedIn')).toBe('true');
      expect(sessionStorage.getItem('statusText')).toBe('Abmeldung in 15 Min');
      expect(component.authenticated).toBe(true);
      expect(component.statusText).toBe('Abmeldung in 15 Min');
      expect(router.navigate).toHaveBeenCalledWith(['/welcome']);
    });

    it('should logout user when authenticated', () => {
      // Arrange
      component.authenticated = true;
      sessionStorage.setItem('loggedIn', 'true');
      sessionStorage.setItem('statusText', 'Abmeldung in 15 Min');

      // Act
      component.onButtonClickWelcome();

      // Assert
      expect(sessionStorage.getItem('loggedIn')).toBe('false');
      expect(sessionStorage.getItem('statusText')).toBe('');
      expect(component.authenticated).toBe(false);
      expect(component.statusText).toBe('');
      expect(router.navigate).toHaveBeenCalledWith(['/']);
    });

    it('should update component state after login', () => {
      // Arrange
      component.authenticated = false;
      component.statusText = '';

      // Act
      component.onButtonClickWelcome();

      // Assert
      expect(component.authenticated).toBe(true);
      expect(component.statusText).toBe('Abmeldung in 15 Min');
    });

    it('should update component state after logout', () => {
      // Arrange
      component.authenticated = true;
      component.statusText = 'Abmeldung in 15 Min';
      sessionStorage.setItem('loggedIn', 'true');
      sessionStorage.setItem('statusText', 'Abmeldung in 15 Min');

      // Act
      component.onButtonClickWelcome();

      // Assert
      expect(component.authenticated).toBe(false);
      expect(component.statusText).toBe('');
    });
  });

  describe('Router integration', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should navigate to welcome page on login', () => {
      component.authenticated = false;

      component.onButtonClickWelcome();

      expect(router.navigate).toHaveBeenCalledWith(['/welcome']);
      expect(router.navigate).toHaveBeenCalledTimes(1);
    });

    it('should navigate to home page on logout', () => {
      component.authenticated = true;

      component.onButtonClickWelcome();

      expect(router.navigate).toHaveBeenCalledWith(['/']);
      expect(router.navigate).toHaveBeenCalledTimes(1);
    });
  });

  describe('Session storage interaction', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should set correct values in sessionStorage on login', () => {
      component.authenticated = false;

      component.onButtonClickWelcome();

      expect(sessionStorage.getItem('loggedIn')).toBe('true');
      expect(sessionStorage.getItem('statusText')).toBe('Abmeldung in 15 Min');
    });

    it('should set correct values in sessionStorage on logout', () => {
      component.authenticated = true;
      sessionStorage.setItem('loggedIn', 'true');
      sessionStorage.setItem('statusText', 'Abmeldung in 15 Min');

      component.onButtonClickWelcome();

      expect(sessionStorage.getItem('loggedIn')).toBe('false');
      expect(sessionStorage.getItem('statusText')).toBe('');
    });

    it('should read from sessionStorage correctly', () => {
      sessionStorage.setItem('loggedIn', 'true');
      sessionStorage.setItem('statusText', 'Custom status');

      component.onButtonClickWelcome(); // This will logout
      component.onButtonClickWelcome(); // This will login again

      expect(component.authenticated).toBe(true);
      expect(component.statusText).toBe('Abmeldung in 15 Min');
    });
  });

  describe('Component properties', () => {
    it('should have correct default username', () => {
      expect(component.username).toBe('Dr. Mustermann');
    });

    it('should have keycloakStatus as undefined initially', () => {
      expect(component.keycloakStatus).toBeUndefined();
    });

    it('should have router injected', () => {
      expect(component.router).toBeTruthy();
      expect(component.router).toBe(router);
    });
  });
});
