import { inject, Injectable } from '@angular/core';

import { firstValueFrom, Observable } from 'rxjs';
import { GutachterDto, UserserviceApiClient } from '../../../api/user/v1';

@Injectable({
  providedIn: 'root',
})
export class GutachterService {
  private userserviceClient = inject(UserserviceApiClient);
  private currentGutachterDto: GutachterDto | null = null;

  constructor() {}

  /**
   * Loads a GutachterDto by userId and caches it.
   * @param userId The user ID to load.
   */
  async loadGutachter(): Promise<GutachterDto | null> {
    const response = this.userserviceClient.getUserInfo('gutachter');
    if (response && typeof (response as Observable<GutachterDto>).subscribe === 'function') {
      (response as Observable<GutachterDto>).subscribe((r: GutachterDto) => (this.currentGutachterDto = r));
    } else {
      this.currentGutachterDto = null;
    }
    console.log(
      'GutachterService: Loaded Gutachter:',
      this.currentGutachterDto,
    );
    return this.currentGutachterDto;
  }

  /**
   * Returns the currently cached GutachterDto.
   */
  getCurrentGutachter(): GutachterDto | null {
    return this.currentGutachterDto;
  }

  /**
   * Clears the cached GutachterDto.
   */
  clearCurrentGutachter(): void {
    this.currentGutachterDto = null;
  }
}
