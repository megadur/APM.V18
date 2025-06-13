import { Injectable } from '@angular/core';

interface AppConfig {
  features: {
    [key: string]: boolean
  };
  [key: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  appConfig: AppConfig | undefined;

  async init() {
    await this.setAppConfig();
  }

  async setAppConfig() {
    this.appConfig = await fetch('assets/config/config.json').then((response) => response.json());
  }

  getFeatureValue(featureName: string) {
    return !!this.appConfig?.features[featureName];
  }
}
