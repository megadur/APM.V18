import { Injectable } from '@angular/core';
import { THEME_KEYS } from '../../core/constants/theme.constants';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly THEME_KEY = THEME_KEYS.STORAGE;
  private readonly DARK_THEME = THEME_KEYS.CLASSES.DARK;
  private readonly LIGHT_THEME = THEME_KEYS.CLASSES.LIGHT;

  constructor() {
    this.observeAppTheme();
  }

  loadTheme(): void {
    const isDarkMode =
      localStorage.getItem(this.THEME_KEY) === this.DARK_THEME ||
      (!(this.THEME_KEY in localStorage) &&
        window.matchMedia(THEME_KEYS.MEDIA_QUERY).matches);

    const theme = isDarkMode ? this.DARK_THEME : this.LIGHT_THEME;
    document.body.classList.remove(this.DARK_THEME, this.LIGHT_THEME);
    document.body.classList.add(theme);
  }

  private observeAppTheme(): void {
    const themeObserver = new MutationObserver(() => {
      const appTheme = document.body.classList.contains(this.DARK_THEME)
        ? this.DARK_THEME
        : this.LIGHT_THEME;

      localStorage.setItem(this.THEME_KEY, appTheme);
    });
    themeObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ['class'],
    });
  }
}
