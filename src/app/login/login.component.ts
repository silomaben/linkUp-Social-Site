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

  constructor(private toastr: ToastrService,private login:AuthService,private route:Router,private is_authenticated:AuthService, private store: Store) {}
  
  submitLoginForm(){
    const credential = this.loginForm.value.credential ?? '';
    const passcode = this.loginForm.value.passcode ?? '';
    if( this.loginForm.valid){
      this.login.login(credential,passcode).subscribe((res: loginResponse) => {
        console.log('res',res)
        localStorage.setItem('token',res.token)
        localStorage.setItem('user', JSON.stringify(res.user));
        this.route.navigateByUrl("/")
        this.is_authenticated.signIn()
        this.toastr.success('Login successful!', 'Success');
        console.log(`success`)
        this.store.dispatch(login({ userDetails: res.user }));
      });

      
      
    } else {

      this.toastr.error('Please check the form for errors.', 'Invalid Form');
      console.log(`error in form`)
    }
    
  }
}
