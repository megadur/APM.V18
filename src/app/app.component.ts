import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { APP_CONFIG } from './features/seanhaddock/app-config';

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
export class AppComponent {
  title = 'Acme Product Management';
  pageTitle = 'Acme Product Management';
  appConfig = inject(APP_CONFIG);
}
