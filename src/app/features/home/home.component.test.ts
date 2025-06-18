import { HomeComponent } from './home.component';
import { LogService } from '../../shared/util-logger';

describe('HomeComponent', () => {
  let logServiceSpy: jasmine.SpyObj<LogService>;
  let originalInject: typeof HomeComponent.prototype['logger'];
  let component: HomeComponent;

  beforeEach(() => {
    logServiceSpy = jasmine.createSpyObj('LogService', ['debug', 'info', 'error']);

    // Patch inject to return our spy
    originalInject = (HomeComponent.prototype as any).logger;
    spyOnProperty(HomeComponent.prototype, 'logger', 'get').and.returnValue(logServiceSpy);

    component = new HomeComponent();
  });

  afterEach(() => {
    // Restore original inject if needed
    (HomeComponent.prototype as any).logger = originalInject;
  });

  it('should have pageTitle as "Welcome"', () => {
    expect(component.pageTitle).toBe('Welcome');
  });

  it('should call logger.debug with correct arguments', () => {
    expect(logServiceSpy.debug).toHaveBeenCalledWith('home', 'My Debug Message');
  });

  it('should call logger.info with correct arguments', () => {
    expect(logServiceSpy.info).toHaveBeenCalledWith('home', 'My Info Message');
  });

  it('should call logger.error with correct arguments', () => {
    expect(logServiceSpy.error).toHaveBeenCalledWith('home', 'My Error Message');
  });
});
