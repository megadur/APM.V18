import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CommonModule } from '@angular/common';
import { IConfig } from '../services/config.model';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectComponent implements OnInit {
  config$: Observable<IConfig> | undefined;

  constructor(private configService: ConfigService) {
    //
  }
  ngOnInit(): void {
    //
    // this.configValue = this.configService.Config?.MyKey;

    this.config$ = this.configService.config$;
  }

}
