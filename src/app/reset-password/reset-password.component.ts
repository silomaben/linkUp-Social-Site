import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  
  resetPasswordForm = new FormGroup({
    password: new FormControl('',[Validators.required]),
    confirmPassword: new FormControl('',Validators.required)
  })
  
  constructor(
    private toastr: ToastrService,
    private auth: AuthService,
    private router: Router
  ){}

  ngOnInit(){
    const user_email = localStorage.getItem('emailrecovery');
    if(!user_email){
      this.router.navigateByUrl("/auth/forgot-password");
    }
  }

  sendResetPassword(){
    const password = this.resetPasswordForm.value.password ?? '';
    const confirmPassword = this.resetPasswordForm.value.confirmPassword ?? '';

    
    if( this.resetPasswordForm.valid){
      const user_email = localStorage.getItem('emailrecovery');
      
      
        if(user_email){

          if(password.length < 8){
            this.toastr.warning('Password should contain 8 or more characters', 'Password strenth', {
              timeOut: 2000, 
            });
            return
          }
          
          if(password !== confirmPassword){
            this.toastr.warning('Password do not match', 'Password matching', {
              timeOut: 1000, 
            });
            return
          }

          this.auth.resetPassword(user_email,password).subscribe((res: any) => {
            console.log('res',res)

            if(res.message == 'Password reset successful'){
              this.toastr.success('Password reset successfully', 'Success', {
                timeOut: 2000,
              });
              localStorage.removeItem('emailrecovery')
              setTimeout(() => {
                  this.router.navigateByUrl("/auth/login");
              }, 1500);
            } else {
              this.toastr.success('We ran into a problem resetting your password', 'Please try again', {
                timeOut: 2000, 
              });
            }
            
          });

        }
      
    } else {

      this.toastr.error('Please check the form for errors.', 'Invalid Form');
      console.log(`error in form`)
    }

  }
}
