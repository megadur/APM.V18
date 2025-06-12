import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { ConfigEnvService } from './core/iamprovidence/config-env/config-env.service';
import { AppConfigService } from './core/SaikiranHegde/app.config.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterLinkActive,
    CommonModule,
    RouterModule,
    RouterLink,
    //ProductModule,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  enableBetaFeatures: boolean=false;;
  title = 'APM.V18';
  pageTitle = 'Acme Product Management';
  configEnvService= inject(ConfigEnvService);
  configService= inject(AppConfigService);
  userServiceUrl:string | undefined;
  ngOnInit() {
    if (this.configService.appConfig && this.configService.appConfig['userServiceUrl']) {
      this.userServiceUrl = this.configService.appConfig['userServiceUrl'];
    } else {
      this.userServiceUrl = undefined;
    }
    // this.enableBetaFeatures = this.configEnvService
    //   .getConfig()
    //   .enableBetaFeatures; // 👈
  }
}
