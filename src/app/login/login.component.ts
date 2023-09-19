import { Component } from '@angular/core';
import { FormControl, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PostsService } from '../services/posts.service';
import { PostResponse, loginResponse } from '../interfaces';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


import { Store } from '@ngrx/store';
import { login, logout } from '../user/store/actions'// Import your actions
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    credential: new FormControl('',[Validators.required,Validators.email]),
    passcode: new FormControl('',Validators.required)
  })

  constructor(private toastr: ToastrService,private auth:AuthService,private route:Router, private store: Store) {}
  
  submitLoginForm(){
    const credential = this.loginForm.value.credential ?? '';
    const passcode = this.loginForm.value.passcode ?? '';

    if(credential.length <= 0){
      this.toastr.error('Please type an email!');
    }

    if(passcode.length <= 0){
      this.toastr.error('Please enter your password!');
    }

    if( this.loginForm.valid){
      this.auth.login(credential,passcode).subscribe((res: loginResponse) => {

        console.log('res',res)
        localStorage.setItem('token',res.token)
        localStorage.setItem('user', JSON.stringify(res.user));
        this.auth.signIn()
        this.store.dispatch(login({ userDetails: res.user }));
        this.toastr.success('Login successful!', 'Success', {
          timeOut: 1000, 
        });
        setTimeout(() => {
            this.route.navigateByUrl("/");
        }, 1500);
      },
      (error) => {
        if (error.error === 'Email is not registered') {
          this.toastr.error('Email is not registered!', 'Error', {
            timeOut: 1000, 
          });
        } else {
          console.error('Unexpected error:', error);
        }
      });

      
      
    } else {

      this.toastr.error('Please enter valid email address!', 'Invalid Form');
      // console.log(`error in form`)
    }
    
  }
}
