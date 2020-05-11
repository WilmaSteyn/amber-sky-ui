import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpAddHeadersInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const modifiedReq = request.clone({
      // headers: request.headers/*.set('Access-Control-Allow-Headers', 'access-control-allow-origin, Access-Control-Allow-Origin')*/
      //                         .set('Access-Control-Allow-Origin', 'http://localhost:4200'),
    });
    return next.handle(modifiedReq);
  }
}
