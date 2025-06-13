import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigEnv } from './config-env';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigEnvService {

  private config: ConfigEnv={apiUrl:'', apiVersion: '', enableBetaFeatures: false};

  constructor(private httpClient: HttpClient) { }

  public initialize(): Promise<void> {
      return firstValueFrom(this.httpClient
          .get<ConfigEnv>('/app/configurations')
          )
          .then(data => {
              this.config = data;
          });
  }

  public getConfig(): ConfigEnv {
      return this.config;
  }
}

