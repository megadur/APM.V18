import { inject, Injectable } from '@angular/core';
import {
  UserserviceApiClient,
  GutachterDto,
} from '../../../generated/userservice-client';
import { firstValueFrom, Observable } from 'rxjs';

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
    const response = await this.userserviceClient.getUserInfo('gutachter');
    response.subscribe((r) => (this.currentGutachterDto = r as GutachterDto));
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
