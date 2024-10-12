import { Component, inject } from '@angular/core';
import { LogService } from '../../shared/util-logger';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  public pageTitle = 'Welcome';
  logger = inject(LogService);
  constructor() {
    this.logger.debug('home', 'My Debug Message');    
    this.logger.info('home', 'My Info Message');    
    this.logger.error('home', 'My Error Message');   
  }
}
