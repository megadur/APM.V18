import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AppConfig, validateConfig } from './config.schema';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private config: AppConfig | undefined;

  constructor(private httpClient: HttpClient) {}

  /**
   * Loads the application configuration from a JSON file, validates it,
   * and stores it. This method is intended to be called by an APP_INITIALIZER.
   */
  public async loadConfig(): Promise<void> {
    const configData = await firstValueFrom(
      this.httpClient.get<unknown>('/configdata/config.json')
    );

    const result = validateConfig(configData);

    if (!result.success) {
      console.error('Configuration validation failed:', result.error.format());
      throw new Error('Invalid application configuration.');
    }

    this.config = result.data;
    console.log('Application configuration loaded and validated successfully.');
  }

  /**
   * Returns the entire application configuration object.
   * Throws an error if the configuration has not been loaded yet.
   * @returns The application configuration.
   */
  public getConfig(): AppConfig {
    if (!this.config) {
      throw new Error(
        'ConfigService.getConfig() called before configuration was loaded.'
      );
    }
    return this.config;
  }
}
