import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ConfigZodService } from '../zod/config-zod.service';

export const myInterceptor: HttpInterceptorFn = (req, next) => {
  const config = inject(ConfigZodService).getConfig();
  let userServiceUrl = '/assets/cfg/config.json';
  if (req.url !== userServiceUrl && config.apiUrl != undefined) {
    userServiceUrl = req.url.replace(
      'http://localhost:8080/api/v1',
      config.apiUrl,
    );
  }

  const dupReq = req.clone({
    url: userServiceUrl ? userServiceUrl : 'https://default.api.url',
  });
  return next(dupReq);
};
