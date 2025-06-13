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
import { ConfigEnvService } from './core/iamprovidence/config-env/config-env.service';
import {
  configFactory,
  ConfigService,
} from './core/ayyash/services/config.service';
import { appLoader } from './core/SaikiranHegde/app.loader';
import { AppConfigService } from './core/SaikiranHegde/app.config.service';

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
    // ConfigEnvService,
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: (appConfigService: ConfigEnvService) => () => appConfigService.initialize(),
    //   deps: [ConfigEnvService],
    //   multi: true
    // }
    {
      //ayyash
      provide: APP_INITIALIZER,
      useFactory: configFactory,
      multi: true,
      deps: [ConfigService],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: appLoader,
      deps: [AppConfigService],
      multi: true,
    },

    //    provideHttpClient(withInterceptors([authInterceptor])),
  ],
};
