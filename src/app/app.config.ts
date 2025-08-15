import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter, withPreloading, PreloadAllModules } from "@angular/router";
import { routes } from "./app.routes";
import { provideConfigInitializer } from "./core/config/config.providers";
import { loggerConfig } from "./logger.config";
import { provideLogger } from "./shared/util-logger";
import { apiInterceptor } from "./core/config/bittucumar/api.interceptor";
import { myInterceptor } from "./core/config/bittucumar/my.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withPreloading(PreloadAllModules)
    ),

    // Add the new config initializer provider
    provideConfigInitializer(),

    // Provide HttpClient with interceptors.
    // NOTE: The interceptors themselves will need to be refactored next.
    // For now, I am leaving them to assess the impact. I expect this to fail.
    provideHttpClient(withInterceptors([apiInterceptor, myInterceptor])),

    provideLogger(loggerConfig),

    // The in-memory web api is not needed for this evaluation.
    // importProvidersFrom(
    //   InMemoryWebApiModule.forRoot(ProductData, { delay: 1000 }),
    // ),
  ],
};
