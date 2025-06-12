export interface IConfig {
  isServed: boolean;
  withError?: boolean; // new to distinguish error in config loading
  apiUrl: string;
  MyKey: string;
}
