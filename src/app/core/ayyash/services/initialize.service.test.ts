import { ComponentRef } from '@angular/core';
import { of } from 'rxjs';
import { InitService, initFactory, platformInitFactory, bootstrapFactory } from './initialize.service';

describe('InitService', () => {
  it('should create an instance', () => {
    const service = new InitService();
    expect(service).toBeTruthy();
  });
});

describe('initFactory', () => {
  it('should return a function that returns an Observable of true', (done) => {
    const service = new InitService();
    const factoryFn = initFactory(service);
    const result$ = factoryFn();
    result$.subscribe(value => {
      expect(value).toBeTrue();
      done();
    });
  });
});

describe('platformInitFactory', () => {
  it('should return a function that logs when called', () => {
    const service = new InitService();
    spyOn(console, 'log');
    const factoryFn = platformInitFactory(service);
    factoryFn();
    expect(console.log).toHaveBeenCalledWith('PLATFORM_INITIALIZER callback');
  });
});

describe('bootstrapFactory', () => {
  it('should return a function that logs when called with a ComponentRef', () => {
    const service = new InitService();
    spyOn(console, 'log');
    const mockComponentRef = {
      location: {
        nativeElement: '<div></div>'
      }
    } as unknown as ComponentRef<any>;
    const factoryFn = bootstrapFactory(service);
    factoryFn(mockComponentRef);
    expect(console.log).toHaveBeenCalledWith('APP_BOOTSTRAP_LISTENER callback:', '<div></div>');
  });
});
