import { Injectable } from '@angular/core';
import { loginRequest, loginResponse } from '../interfaces';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { login, logout } from '../user/store/actions'// Import your actions

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor( private http:HttpClient,private route:Router,private store:Store) { }

  
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
    const url = 'http://localhost:4500/auth/forgot-password'

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

    return this.http.post<loginResponse>(url,requestBody)
  }

  signIn() {
    // Implement your login logic and set isAuthenticated to true upon successful login.
    this.isAuthenticated = true;
  }

  signOut() {
    // Implement your logout logic and set isAuthenticated to false upon logout.
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
