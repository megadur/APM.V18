import { Injectable } from '@angular/core';
import { ConfigDTO } from './config.dto';


@Injectable({
  providedIn: 'root',
})
export class DrvConfigService {
  #config!: ConfigDTO;

  setConfig(config: ConfigDTO) {
    this.#config = config;
  }

  getConfig() {
    return this.#config;
  }
}
