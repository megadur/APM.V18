import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { AppConfig } from "./app-config";

export const MY_APP_CONFIG: AppConfig = {
  apiHost: '',
};

export function initializeAppFactory(httpClient: HttpClient): () => Observable<AppConfig> {
  return () =>
   // httpClient.get<AppConfig>('/api/config/getconfig').pipe(
    httpClient.get<AppConfig>('/assets/app.config.json')
    .pipe(
      tap((config) =>
        Object.assign(MY_APP_CONFIG, {
          ...config,
          apiHost: `${config.apiHost}`,
        })
      )
    );
}