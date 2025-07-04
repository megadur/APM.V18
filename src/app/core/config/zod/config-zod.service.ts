import { Injectable } from '@angular/core';
import { ConfigDTO } from './config-zod';

@Injectable({
  providedIn: 'root'
})
export class ConfigZodService {
    #config!: ConfigDTO;

  setConfig(config: ConfigDTO) {
    this.#config = config;
  }

  getConfig() {
    return this.#config;
  }
}
