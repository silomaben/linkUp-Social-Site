import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  constructor(
    private auth: AuthService,
    private toastr: ToastrService,
    private router: Router
  ){}

  forgotPasswordForm = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email])
  })


  haveForgottenPassword(){
    const email = this.forgotPasswordForm.value.email ?? '';

    if(email.length <= 1){
      this.toastr.error('Please Input an email', 'Invalid Form');
      return
    }

    if( this.forgotPasswordForm.valid){


      this.auth.forgotPassword(email).subscribe((res: any) => {

        if(res.message='Password reset email sent'){
          localStorage.setItem('emailrecovery',res.email)
          this.toastr.success(`Password reset link has been sent to ${email}`, 'Success', {
            timeOut: 3000, 
          });
        } 
        
      },
      (error) => {
        if(error.error.error==='Email is not registered'){
          this.toastr.error(`Email is not registered`, 'Error', {
            timeOut: 3000, 
          });
        } else {
          // Handle other error cases if needed
          console.error('Unexpected error:', error);
        }
      });
    
    } else {

      this.toastr.error('Incorrect email format. Please enter valid email format', 'Invalid Email');
      console.log(`error in form`)
    }
    
  }

}
