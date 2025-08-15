import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';
import { ConfigService } from './core/config/config.service';
import { AppConfig } from './core/config/config.schema';
import { Component } from '@angular/core';

// Mock HeaderComponent to isolate the AppComponent
@Component({
  selector: 'app-header',
  template: '',
  standalone: true,
})
class MockHeaderComponent {}

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let mockConfigService: jasmine.SpyObj<ConfigService>;

  const mockConfig: AppConfig = {
    apiUrl: 'http://api.test.com',
    userServiceUrl: 'http://user.test.com',
    enableBetaFeatures: true,
  };

  beforeEach(async () => {
    const configServiceSpy = jasmine.createSpyObj('ConfigService', ['getConfig']);
    configServiceSpy.getConfig.and.returnValue(mockConfig);

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter([]),
        { provide: ConfigService, useValue: configServiceSpy },
      ],
    })
    // Override the HeaderComponent to avoid its own dependencies
    .overrideComponent(AppComponent, {
      remove: { imports: [MockHeaderComponent] },
      add: { imports: [MockHeaderComponent] }
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    mockConfigService = TestBed.inject(ConfigService) as jasmine.SpyObj<ConfigService>;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the pageTitle 'Acme Product Management'`, () => {
    expect(component.pageTitle).toEqual('Acme Product Management');
  });

  it('should get the config from ConfigService on init', () => {
    // Act
    fixture.detectChanges(); // Triggers ngOnInit

    // Assert
    expect(mockConfigService.getConfig).toHaveBeenCalled();
    expect(component.config).toEqual(mockConfig);
  });

  it('should render the user service URL from the config', () => {
    // Act
    fixture.detectChanges(); // Triggers ngOnInit and renders the template
    const compiled = fixture.nativeElement as HTMLElement;
    const pElement = compiled.querySelector('p:nth-of-type(2)');

    // Assert
    expect(pElement?.textContent).toContain(`User Service URL: ${mockConfig.userServiceUrl}`);
  });

  it('should render the beta features status from the config', () => {
     // Act
     fixture.detectChanges(); // Triggers ngOnInit and renders the template
     const compiled = fixture.nativeElement as HTMLElement;
     const pElement = compiled.querySelector('p:nth-of-type(1)');

     // Assert
     expect(pElement?.textContent).toContain('Beta Features: Enabled');
  });
});
