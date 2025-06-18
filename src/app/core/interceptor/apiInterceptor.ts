import { HttpInterceptorFn } from '@angular/common/http';

import Config from '../../../assets/cfg/api.config.json';
const DEFAULT_API_GUTACHTEN = 'http://localhost:8080/api/v1';
const DEFAULT_API_USER = 'http://localhost:9000/api/v1';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  let newHeaders = req.headers;
  // If the header does not contain a X-Id and there is one in Config,
  // we append it to our new headers
  if (!newHeaders.get('X-UserId') && Config.xUserId) {
    newHeaders = newHeaders.append('X-UserId', Config.xUserId);
  }
  if (!newHeaders.get('X-OrgId') && Config.xOrgId) {
    newHeaders = newHeaders.append('X-OrgId', Config.xOrgId);
  }
  if (!newHeaders.get('X-GutachterId') && Config.xGutachterId) {
    newHeaders = newHeaders.append('X-GutachterId', Config.xGutachterId);
  }

  if (req.url.startsWith(DEFAULT_API_GUTACHTEN)) {
    return next(
      req.clone({
        url: req.url.replace(DEFAULT_API_GUTACHTEN, Config.apiUrlGutachten),
        headers: newHeaders,
      }),
    );
  }
  if (req.url.startsWith(DEFAULT_API_USER)) {
    return next(
      req.clone({
        url: req.url.replace(DEFAULT_API_USER, Config.apiUrlUser),
        headers: newHeaders,
      }),
    );
  }

  return next(req);
};
