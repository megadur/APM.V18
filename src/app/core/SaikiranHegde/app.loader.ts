import { AppConfigService } from "./app.config.service";

export const appLoader = (config: AppConfigService): (() => Promise<boolean>) => {
  return (): Promise<boolean> => {
    return new Promise<boolean>(
      (resolve: (a: boolean) => void): void => {
        config
          .init()
          .then(() => resolve(true))
          .catch(err => resolve(true));
      }
    );
  };
};
