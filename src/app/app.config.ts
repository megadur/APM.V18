import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { PreloadAllModules, provideRouter, withDebugTracing, withPreloading } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProductData } from './features/products/data/product-data';
import { provideLogger } from './shared/util-logger';
import { loggerConfig } from './logger.config';


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


//    provideHttpClient(withInterceptors([authInterceptor])),

  ]
};
