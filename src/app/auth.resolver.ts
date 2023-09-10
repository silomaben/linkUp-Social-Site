import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { AuthService } from './services/auth.service'; 

@Injectable({
  providedIn: 'root',
})
export class AuthStatusResolver implements Resolve<boolean> {
  constructor(private authService: AuthService) {}

  resolve(): boolean {
    return this.authService.isAuthenticatedUser();
  }
}
