import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ConfigService } from '../config.service';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const config = inject(ConfigService).getConfig();

  // Use the new, unified config object.
  // This logic may need to be adjusted based on which URL is the correct one.
  // I am choosing 'userServiceUrl' based on the original interceptor's logic.
  const userServiceUrl = config.userServiceUrl;

  if (userServiceUrl) {
    const dupReq = req.clone({ url: userServiceUrl });
    return next(dupReq);
  }

  // If no specific URL is in the config, pass the original request.
  return next(req);
};
