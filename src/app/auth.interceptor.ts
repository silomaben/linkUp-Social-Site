import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const exemptedRoutes = [`https://api.cloudinary.com/v1_1/${environment.cloud_name}/image/upload`,'auth/register']

    if(exemptedRoutes.includes(request.url)){
      console.log('exempted');
      
      return next.handle(request);
    }

    const localToken = localStorage.getItem('token')
    request = request.clone({ headers: request.headers.set('token', `${localToken}`)})
    return next.handle(request);
  }
}
