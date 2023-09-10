import { Injectable } from '@angular/core';
import { loginRequest, loginResponse } from '../interfaces';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor( private http:HttpClient,private route:Router) { }

  
  private isAuthenticated = !!localStorage.getItem('token') && !!localStorage.getItem('user');

  

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
    

  }

  isAuthenticatedUser() {
    return this.isAuthenticated;
  }


  
}
