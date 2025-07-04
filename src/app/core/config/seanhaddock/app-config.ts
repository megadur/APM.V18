import { HttpClient } from '@angular/common/http';
import { InjectionToken } from '@angular/core';
import { Observable, tap } from 'rxjs';

export interface EnvConfig {
  apiUrl: string;
}

export const ENV_CONFIG = new InjectionToken<EnvConfig>('app.config');
