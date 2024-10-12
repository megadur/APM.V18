import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [    
    //BrowserModule,
    CommonModule,
    RouterModule,
    RouterLink, 
    //ProductModule,
    RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'APM.V18';
  pageTitle = 'Acme Product Management';

}
