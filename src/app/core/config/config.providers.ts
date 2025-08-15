import { APP_INITIALIZER, Provider } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';

/**
 * Factory function for the APP_INITIALIZER provider.
 * It creates an instance of ConfigService and calls its loadConfig method.
 */
function configInitializerFactory(configService: ConfigService): () => Promise<void> {
  return () => configService.loadConfig();
}

/**
 * The APP_INITIALIZER provider for loading application configuration.
 */
export const provideConfigInitializer = (): Provider => {
  return {
    provide: APP_INITIALIZER,
    useFactory: configInitializerFactory,
    deps: [ConfigService],
    multi: true,
  };
};
