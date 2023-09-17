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
    if( this.forgotPasswordForm.valid){


      this.auth.forgotPassword(email).subscribe((res: any) => {
        localStorage.setItem('emailrecovery',res.email)
        this.toastr.success(`Password reset link has been sent to ${email}`, 'Success', {
          timeOut: 1000, 
        });
      });
    
    } else {

      this.toastr.error('Check your email for errors', 'Invalid Form');
      console.log(`error in form`)
    }
    
  }

}
