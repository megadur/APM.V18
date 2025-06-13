import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default username as "Dr. Mustermann"', () => {
    expect(component.username).toBe('Dr. Mustermann');
  });

  it('should initialize authenticated based on sessionStorage', () => {
    sessionStorage.setItem('loggedIn', 'true');
    const testComponent = new HeaderComponent(TestBed.inject<any>(component['router'].constructor));
    expect(testComponent.authenticated).toBeTrue();
    sessionStorage.setItem('loggedIn', 'false');
    const testComponent2 = new HeaderComponent(TestBed.inject<any>(component['router'].constructor));
    expect(testComponent2.authenticated).toBeFalse();
  });

  it('should simulate login on onButtonClickWelcome when not authenticated', () => {
    spyOn(component['router'], 'navigate');
    component.authenticated = false;
    sessionStorage.setItem('loggedIn', 'false');
    sessionStorage.setItem('statusText', '');
    component.onButtonClickWelcome();
    expect(sessionStorage.getItem('loggedIn')).toBe('true');
    expect(sessionStorage.getItem('statusText')).toBe('Abmeldung in 15 Min');
    expect(component['router'].navigate).toHaveBeenCalledWith(['/welcome']);
    expect(component.authenticated).toBeTrue();
    expect(component.statusText).toBe('Abmeldung in 15 Min');
  });

  it('should simulate logout on onButtonClickWelcome when authenticated', () => {
    spyOn(component['router'], 'navigate');
    component.authenticated = true;
    sessionStorage.setItem('loggedIn', 'true');
    sessionStorage.setItem('statusText', 'Abmeldung in 15 Min');
    component.onButtonClickWelcome();
    expect(sessionStorage.getItem('loggedIn')).toBe('false');
    expect(sessionStorage.getItem('statusText')).toBe('');
    expect(component['router'].navigate).toHaveBeenCalledWith(['/']);
    expect(component.authenticated).toBeFalse();
    expect(component.statusText).toBe('');
  });
});
