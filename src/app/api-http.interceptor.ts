import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiHttpInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const userToken = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyaWQiOiIxMjM0NSIsImVtYWlsIjoiZW1tYW51ZWwubWF1cmljZUBnbWFpbC5jb20iLCJwc2V1ZG8iOiJlbW1hIiwiaWF0IjoxNjE4OTQyNDM3LCJleHAiOjExNjE4OTQyNDM2fQ.vuGw3mlwWNYDjyoyv_H-AnLKGPqmcQFlkK620S2TYCM";

    const modifiedReq = request.clone({
      headers: request.headers.set('Authorization', userToken),
    })
    return next.handle(modifiedReq);
  }
}
