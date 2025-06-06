import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { EnvConfig } from "./app-config";

export const MY_ENV_CONFIG: EnvConfig = {
  apiUrl: '',
};

export function initializeAppFactory(httpClient: HttpClient): () => Observable<EnvConfig> {
  return () =>
   // httpClient.get<AppConfig>('/api/config/getconfig').pipe(
    httpClient.get<EnvConfig>('/assets/app.config.json')
    .pipe(
      tap((config) =>
        Object.assign(MY_ENV_CONFIG, {
          ...config,
          apiHost: `${config.apiUrl}`,
        })
      )
    );
}