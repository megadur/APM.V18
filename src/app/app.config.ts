import { provideHttpClient } from "@angular/common/http";
import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom, APP_INITIALIZER } from "@angular/core";
import { provideRouter, withPreloading, PreloadAllModules } from "@angular/router";
import { InMemoryWebApiModule } from "angular-in-memory-web-api";
import { routes } from "./app.routes";
import { configFactory } from "./core/config/ayyash/services/config.service";
import { DrvConfigService } from "./core/config/drv/drv.config.service";
import { AppConfigService } from "./core/config/SaikiranHegde/app.config.service";
import { appLoader } from "./core/config/SaikiranHegde/app.loader";
import { ProductData } from "./features/products/data/product-data";
import { loggerConfig } from "./logger.config";
import { provideLogger } from "./shared/util-logger";

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
      provide: APP_INITIALIZER,
      useFactory: configFactory,
      multi: true,
      deps: [DrvConfigService],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: appLoader,
      deps: [AppConfigService],
      multi: true,
    },
    AppConfigService,
    DrvConfigService

    //    provideHttpClient(withInterceptors([authInterceptor])),
  ],
};
