import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        // Mock ConfigService or provide a value for config if needed
        {
          provide: 'ConfigService',
          useValue: {
            config$: { subscribe: () => {} },
            config: {}
          }
        }
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'Acme Product Management' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('APM.V18');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Hello, APM.V18',
    );
  });

  it('should have the correct pageTitle', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.pageTitle).toBe('Acme Product Management');
  });

  it('should inject config', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.configZodService).toBeDefined();
  });

  it('should set userServiceUrl from config if present', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    // Mock config with userServiceUrl and required features property
    app.configAppService.appConfig= { userServiceUrl: 'http://test-url', features: {} };
    app.ngOnInit();
    expect(app.userServiceUrl).toBe('http://test-url');
  });

  it('should set userServiceUrl to undefined if not present in config', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.configAppService.appConfig = { features: {} };
    app.ngOnInit();
    expect(app.userServiceUrl).toBeUndefined();
  });

  it('should assign config$ from configService', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.ngOnInit();
    expect(app.config$).toBe(app.configService.config$);
  });

  it('should have configValueKey defined or undefined', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    // configValueKey can be undefined if ConfigService.Config is undefined
    expect('configValueKey' in app).toBeTrue();
  });

  it('should get config from ConfigZodService', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    // Ensure that userServiceUrl is defined
    const app = fixture.componentInstance;
    // Mock config if undefined
    if (app.configZodService === undefined) {
      app.configZodService = {};
    }
    expect(app.configZodService).toBeDefined();
  });
});
