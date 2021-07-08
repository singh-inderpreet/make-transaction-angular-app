import { Injectable, InjectionToken } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export const DEFAULT_TIMEOUT = new InjectionToken<number>('defaultTimeout');

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor() {}

  /**
   * Intercept the HTTP Requests to update HTTP Headers
   * @param {HttpRequest<any>} req
   * @param {HttpHandler} next
   * @return {*}  {Observable<HttpEvent<any>>}
   * @memberof HttpInterceptorService
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authReq = req.clone({
      headers: new HttpHeaders({
      })
    });
    return next.handle(authReq);
  }
}
