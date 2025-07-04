import { HttpInterceptorFn } from '@angular/common/http';
import { AppConfigService } from '../config/SaikiranHegde/app.config.service';
import { inject } from '@angular/core';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const configService= inject(AppConfigService);
  let userServiceUrl = undefined;
      if (configService.appConfig &&configService.appConfig['userServiceUrl']) {
      userServiceUrl = configService.appConfig['userServiceUrl'];
    }
  const dupReq = req.clone({ url: userServiceUrl ? userServiceUrl : 'https://default.api.url' });
  return next(dupReq);
};

//  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const dupReq = req.clone({ url: 'mynewurl.com' });
//     return next.handle(dupReq);
//   }
