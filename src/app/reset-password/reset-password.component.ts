import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  
  resetPasswordForm = this.formBuilder.group({
    password: new FormControl('',[Validators.required]),
    confirmPassword: new FormControl('',Validators.required)
  })
  
  constructor(
    private toastr: ToastrService,
    private auth: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ){}


  sendResetPassword(){
    const password = this.resetPasswordForm.value.password ?? '';
    const confirmPassword = this.resetPasswordForm.value.confirmPassword ?? '';

    console.log(password, confirmPassword);

    
    
    if( this.resetPasswordForm.valid){
      const storedUser = localStorage.getItem('user');
        
        if(storedUser){
          const user = JSON.parse(storedUser);
          const user_email = user.email;

          if(password !== confirmPassword){
            this.toastr.warning('Password do not match', 'Password matching', {
              timeOut: 1000, 
            });
          }
          this.auth.resetPassword(user_email,password).subscribe((res: any) => {
            console.log('res',res)

            if(res.message == 'Password reset successful'){
              this.toastr.success('Password reset successfully', 'Success', {
                timeOut: 1000, 
              });
              setTimeout(() => {
                  this.router.navigateByUrl("/");
              }, 1500);
            } else {
              this.toastr.success('We ran into a problem resetting your password', 'Please try again', {
                timeOut: 1000, 
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
