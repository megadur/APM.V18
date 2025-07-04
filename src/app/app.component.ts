import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { Observable } from 'rxjs';
import { IConfig } from './core/config/ayyash/services/config.model';

import { ConfigEnvService } from './core/config/iamprovidence/config-env/config-env.service';
import { AppConfigService } from './core/config/SaikiranHegde/app.config.service';
import { ConfigZodService } from './core/config/zod/config-zod.service';
import { ConfigService } from './core/config/ayyash/services/config.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterLinkActive,
    CommonModule,
    RouterModule,
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  enableBetaFeatures: boolean = false;
  title = 'APM.V18';
  pageTitle = 'Acme Product Management';
  configEnvService = inject(ConfigEnvService);
  configAppService = inject(AppConfigService);
  configService = inject(ConfigService);
  configZodService = inject(ConfigZodService).getConfig();

  configValueKey = ConfigService.Config?.MyKey;
  userServiceUrl: string | undefined;
  config$: Observable<IConfig> | undefined;
  ngOnInit() {
    if (
      this.configAppService.appConfig &&
      this.configAppService.appConfig['userServiceUrl']
    ) {
      this.userServiceUrl = this.configAppService.appConfig['userServiceUrl'];
    } else {
      this.userServiceUrl = undefined;
    }
    // this.configValue = this.configService.Config?.MyKey;

    this.config$ = this.configService.config$;
    // this.enableBetaFeatures = this.configEnvService
    //   .getConfig()
    //   .enableBetaFeatures; // 👈
  }
}
