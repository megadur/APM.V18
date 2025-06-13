import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withDebugTracing,
  withPreloading,
} from '@angular/router';

import { routes } from './app.routes';
import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProductData } from './features/products/data/product-data';
import { provideLogger } from './shared/util-logger';
import { loggerConfig } from './logger.config';
import { ENV_CONFIG } from './core/seanhaddock/app-config';
import { initializeAppConfigFactory, MY_ENV_CONFIG } from './core/seanhaddock/app-config.factory';
import { ConfigEnvService } from './core/iamprovidence/config-env/config-env.service';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      //  withDebugTracing(),
    ),
    provideHttpClient(),
    importProvidersFrom(
      InMemoryWebApiModule.forRoot(ProductData, { delay: 1000 }),
    ),
    provideLogger(loggerConfig),
    // new
    // provideAppInitializer(() => {
    //   const initializerFn = initializeAppFactory(inject(HttpClient));
    //   return initializerFn;
    // }),
    // old
    {
      provide: APP_INITIALIZER,
      useFactory: (http: HttpClient) => initializeAppConfigFactory(http),
      deps: [HttpClient],
      multi: false,
    },
    { provide: ENV_CONFIG, useValue: MY_ENV_CONFIG },
    ConfigEnvService,
    {
      provide: APP_INITIALIZER,
      useFactory: (configEnvService: ConfigEnvService) => () => configEnvService.initialize(),
      deps: [ConfigEnvService],
      multi: true
    }
    //    provideHttpClient(withInterceptors([authInterceptor])),
  ],
};
