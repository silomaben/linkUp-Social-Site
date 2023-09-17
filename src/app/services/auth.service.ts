import { Injectable } from '@angular/core';
import { loginRequest, loginResponse } from '../interfaces';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { Store } from '@ngrx/store';
import { login, logout } from '../user/store/actions'// Import your actions
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor( private http:HttpClient,private route:Router,private store:Store, private toastr: ToastrService) { }

  
  private isAuthenticated = !!localStorage.getItem('token') && !!localStorage.getItem('user');

  register(first_name: string,last_name:string,username:string,email:string,password:string): Observable<any>{

    const url = `http://localhost:4500/auth/register`

    const requestBody = {
      first_name: first_name,
      last_name: last_name,
      username: username,
      email: email,
      password: password,
      profile_pic_url: "https://img.freepik.com/premium-vector/anonymous-user-circle-icon-vector-illustration-flat-style-with-long-shadow_520826-1931.jpg"
    }

    return this.http.post<any>(url,requestBody)
  }

  forgotPassword(email:string): Observable<any>{

    const url = `http://localhost:4500/auth/forgot-password`

    const requestBody = {
      email: email
    }

    return this.http.post<any>(url,requestBody)
  }

  resetPassword(email:string,password:string){
    const url = 'http://localhost:4500/auth/reset-password'

    const requestBody = {
      email: email,
      password:password
    }

    return this.http.post<any>(url,requestBody)
  }

  

  login(credential:string,passcode:string): Observable<loginResponse>{
    const url = `http://localhost:4500/auth/login`

    const requestBody: loginRequest = {
      credential: credential,
      passcode: passcode
    };

    return this.http.post<loginResponse>(url, requestBody).pipe(
      catchError((error) => {
        if (error.error.error === 'Email is not registered') {
          this.toastr.error('Email is not registered!', 'Error', {
            timeOut: 1000,
          });
        } else if (error.error.error === 'Account is deactivated') {
          this.toastr.error('Account is deactivated! You will be notified once you are reactivated via email', 'Error', {
            timeOut: 3000,
          });
        } else {
          console.error('Unexpected error:', error);
        }
  
        return throwError(error);
      })
    );
  }


  barnUser(my_id:string, password:string,user_id:string){
    const url = 'http://localhost:4500/auth/barn'

    const requestBody = {
      admin_id: my_id,
      admin_password: password,
      user_id: user_id
  }

    return this.http.post<any>(url,requestBody)
  }

  unbarnUser(my_id:string, password:string,user_id:string){
    const url = 'http://localhost:4500/auth/unbarn'

    const requestBody = {
      admin_id: my_id,
      admin_password: password,
      user_id: user_id
  }

    return this.http.post<any>(url,requestBody)
  }

  deactivateAccount(user_id:string,password:string){
    const url = 'http://localhost:4500/auth/deactivate'

    const requestBody = {
      user_id: user_id,
      password: password
  }

    return this.http.post<any>(url,requestBody)
  }

  signIn() {
    this.isAuthenticated = true;
  }

  signOut() {
    localStorage.clear();
    this.route.navigateByUrl("/auth/login")
    console.log('logged out');
    this.isAuthenticated = false;
    this.store.dispatch(logout());
  }

  isAuthenticatedUser() {
    return this.isAuthenticated;
  }


  
}
