import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private route:Router, private toastr:ToastrService, private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const exemptedRoutes = [
      `https://api.cloudinary.com/v1_1/${environment.cloud_name}/image/upload`,
      'auth/register',
    ];

    if (exemptedRoutes.includes(request.url)) {
      return next.handle(request);
    }

    const localToken = localStorage.getItem('token');
    request = request.clone({
      headers: request.headers.set('token', `${localToken}`),
    });

    return next.handle(request).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          // console.log('Response:', event.body);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Unauthorized
          this.toastr.info('Please login again', 'Session expired!', {
            timeOut: 1000, 
          });
          setTimeout(() => {
            localStorage.clear();
            let modal = document.querySelector('.open') as HTMLDivElement
            modal.className='close'
            this.authService.signOut()
            // console.log('You are being redirected to login page');
          }, 1500);      
        }

        return throwError(error);
      })
    );
  }
}



// forget password
// verify token
//reset password
// deactivate user
// activate user
// fetch recent posts
// update comment
// like comment
// unlike comment
// create subcomment //
// update subcomment
// like subcomment
// unlike subcomment
// barn
// unbarn
// keep email private--- take this into update user