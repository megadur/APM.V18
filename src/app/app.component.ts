import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { HeaderComponent } from './core/layout/header/header.component';
import { ConfigService } from './core/config/config.service';
import { AppConfig } from './core/config/config.schema';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterLinkActive,
    CommonModule,
    RouterModule,
    RouterLink,
    RouterOutlet,
    HeaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'APM.V18';
  pageTitle = 'Acme Product Management';

  // Inject the single, unified ConfigService
  private configService = inject(ConfigService);

  // Hold the config for the template
  public config!: AppConfig;

  ngOnInit() {
    // Get the configuration from the service
    this.config = this.configService.getConfig();

    // Example of how to use a feature flag from the new config
    const enableBetaFeatures = this.config.enableBetaFeatures ?? false;
    console.log('Beta features enabled:', enableBetaFeatures);
  }
}
