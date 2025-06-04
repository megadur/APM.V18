import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { PreloadAllModules, provideRouter, withDebugTracing, withPreloading } from '@angular/router';

import { routes } from './app.routes';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProductData } from './features/products/data/product-data';
import { provideLogger } from './shared/util-logger';
import { loggerConfig } from './logger.config';
import { APP_CONFIG } from './features/seanhaddock/app-config';
import { initializeAppFactory, MY_APP_CONFIG } from './features/seanhaddock/initialize-app.factory';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes, 
      withPreloading(PreloadAllModules),
    //  withDebugTracing(),
    ),
    provideHttpClient(),
    importProvidersFrom(InMemoryWebApiModule.forRoot(ProductData, { delay: 1000 })),
    provideLogger(loggerConfig),
    // new
    // provideAppInitializer(() => {
    //   const initializerFn = initializeAppFactory(inject(HttpClient));
    //   return initializerFn;
    // }),
    // old
      {
      provide: APP_INITIALIZER,
      useFactory: initializeAppFactory,
      deps: [HttpClient],
      multi: false,
    },
    { provide: APP_CONFIG, useValue: MY_APP_CONFIG },


//    provideHttpClient(withInterceptors([authInterceptor])),

  ]
};

