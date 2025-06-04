import { HttpClient } from '@angular/common/http';
import { InjectionToken } from '@angular/core';
import { Observable, tap } from 'rxjs';

export interface AppConfig {
  apiHost: string;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');
