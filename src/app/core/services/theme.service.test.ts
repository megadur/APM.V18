import { ThemeService } from './theme.service';

const THEME_KEYS = {
  STORAGE: 'theme',
  CLASSES: {
    DARK: 'dark-theme',
    LIGHT: 'light-theme',
  },
  MEDIA_QUERY: '(prefers-color-scheme: dark)',
};

describe('ThemeService', () => {
  let service: ThemeService;
  let originalMatchMedia: typeof window.matchMedia;
  let originalLocalStorage: Storage;
  let bodyClassList: DOMTokenList;

  beforeAll(() => {
    // @ts-ignore
    window.THEME_KEYS = THEME_KEYS;
  });

  beforeEach(() => {
    // Mock localStorage
    const store: Record<string, string> = {};
    originalLocalStorage = window.localStorage;
    spyOn(window.localStorage, 'getItem').and.callFake((key: string) => store[key]);
    spyOn(window.localStorage, 'setItem').and.callFake((key: string, value: string) => {
      store[key] = value;
    });
    spyOnProperty(window.localStorage, 'length', 'get').and.callFake(() => Object.keys(store).length);

    // Mock document.body.classList
    bodyClassList = {
      classes: new Set<string>(),
      add: function (...tokens: string[]) { tokens.forEach(t => this.classes.add(t)); },
      remove: function (...tokens: string[]) { tokens.forEach(t => this.classes.delete(t)); },
      contains: function (token: string) { return this.classes.has(token); },
      get length() { return this.classes.size; },
      item: function (index: number) { return Array.from(this.classes)[index]; },
      toggle: function (token: string, force?: boolean) {
        if (force === undefined) {
          if (this.classes.has(token)) this.classes.delete(token);
          else this.classes.add(token);
        } else {
          if (force) this.classes.add(token);
          else this.classes.delete(token);
        }
        return this.classes.has(token);
      },
      forEach: function (callback: (value: string, value2: string, set: Set<string>) => void, thisArg?: any) {
        this.classes.forEach(callback, thisArg);
      }
    } as unknown as DOMTokenList;
    spyOnProperty(document, 'body', 'get').and.returnValue({ classList: bodyClassList } as any);

    // Mock MutationObserver
    spyOn(window as any, 'MutationObserver').and.callFake(function (cb: any) {
      this.observe = () => {};
      this.disconnect = () => {};
      this.takeRecords = () => [];
      this.cb = cb;
    });

    // Mock matchMedia
    originalMatchMedia = window.matchMedia;
    window.matchMedia = jasmine.createSpy('matchMedia').and.returnValue({ matches: false });

    // Provide THEME_KEYS to the service
    // @ts-ignore
    service = new ThemeService();
    // Patch private constants for test
    // @ts-ignore
    service.THEME_KEY = THEME_KEYS.STORAGE;
    // @ts-ignore
    service.DARK_THEME = THEME_KEYS.CLASSES.DARK;
    // @ts-ignore
    service.LIGHT_THEME = THEME_KEYS.CLASSES.LIGHT;
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
    window.localStorage = originalLocalStorage;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add dark theme if localStorage has dark theme', () => {
    (window.localStorage.getItem as jasmine.Spy).and.returnValue(THEME_KEYS.CLASSES.DARK);
    service.loadTheme();
    expect(bodyClassList.contains(THEME_KEYS.CLASSES.DARK)).toBeTrue();
    expect(bodyClassList.contains(THEME_KEYS.CLASSES.LIGHT)).toBeFalse();
  });

  it('should add light theme if localStorage has light theme', () => {
    (window.localStorage.getItem as jasmine.Spy).and.returnValue(THEME_KEYS.CLASSES.LIGHT);
    service.loadTheme();
    expect(bodyClassList.contains(THEME_KEYS.CLASSES.LIGHT)).toBeTrue();
    expect(bodyClassList.contains(THEME_KEYS.CLASSES.DARK)).toBeFalse();
  });

  it('should add dark theme if no theme in localStorage and prefers dark', () => {
    (window.localStorage.getItem as jasmine.Spy).and.returnValue(null);
    (window.matchMedia as jasmine.Spy).and.returnValue({ matches: true });
    service.loadTheme();
    expect(bodyClassList.contains(THEME_KEYS.CLASSES.DARK)).toBeTrue();
  });

  it('should add light theme if no theme in localStorage and does not prefer dark', () => {
    (window.localStorage.getItem as jasmine.Spy).and.returnValue(null);
    (window.matchMedia as jasmine.Spy).and.returnValue({ matches: false });
    service.loadTheme();
    expect(bodyClassList.contains(THEME_KEYS.CLASSES.LIGHT)).toBeTrue();
  });

  it('should update localStorage when body class changes to dark', () => {
    // Simulate MutationObserver callback
    bodyClassList.add(THEME_KEYS.CLASSES.DARK);
    // @ts-ignore
    service['observeAppTheme']();
    // Simulate mutation
    const observerInstance = (window.MutationObserver as jasmine.Spy).calls.mostRecent().object;
    observerInstance.cb();
    expect(window.localStorage.setItem).toHaveBeenCalledWith(THEME_KEYS.STORAGE, THEME_KEYS.CLASSES.DARK);
  });

  it('should update localStorage when body class changes to light', () => {
    bodyClassList.add(THEME_KEYS.CLASSES.LIGHT);
    // @ts-ignore
    service['observeAppTheme']();
    const observerInstance = (window.MutationObserver as jasmine.Spy).calls.mostRecent().object;
    observerInstance.cb();
    expect(window.localStorage.setItem).toHaveBeenCalledWith(THEME_KEYS.STORAGE, THEME_KEYS.CLASSES.LIGHT);
  });
});
