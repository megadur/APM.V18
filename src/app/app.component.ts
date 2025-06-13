import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { ConfigEnvService } from './core/iamprovidence/config-env/config-env.service';
import { ENV_CONFIG } from './core/seanhaddock/app-config';

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
  title = 'Acme Product Management';
  pageTitle = 'Acme Product Management';
  appConfig = inject(ENV_CONFIG);
  configEnvService= inject(ConfigEnvService);
  ngOnInit() {
    this.enableBetaFeatures = this.configEnvService
      .getConfig()
      .enableBetaFeatures; // 👈
  }
}
