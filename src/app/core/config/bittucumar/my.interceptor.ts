import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ConfigService } from '../config.service';

export const myInterceptor: HttpInterceptorFn = (req, next) => {
  const config = inject(ConfigService).getConfig();
  const apiUrl = config.apiUrl;

  // This interceptor replaced a hardcoded localhost URL.
  // We will replicate that logic with the new config service.
  const localApiUrl = 'http://localhost:8080/api/v1';

  if (apiUrl && req.url.startsWith(localApiUrl)) {
    const newUrl = req.url.replace(localApiUrl, apiUrl);
    const dupReq = req.clone({ url: newUrl });
    return next(dupReq);
  }

  return next(req);
};
