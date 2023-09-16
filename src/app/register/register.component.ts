import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(
    private toastr:ToastrService,
    private auth:AuthService,
    private router: Router
  ){}

  registerForm = new FormGroup({
    first_name: new FormControl('',[Validators.required]),
    last_name: new FormControl('',[Validators.required]),
    username: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',Validators.required),
    confirmPassword: new FormControl('',Validators.required)
  })

  submitRegistrationForm(){
   
    
    const first_name = this.registerForm.value.first_name ?? '';
    const last_name = this.registerForm.value.last_name ?? '';
    const username = this.registerForm.value.username ?? '';
    const email = this.registerForm.value.email ?? '';
    const password = this.registerForm.value.password ?? '';
    const confirmPassword = this.registerForm.value.confirmPassword ?? '';

    
    if( this.registerForm.valid){

      if(password !== confirmPassword){
        this.toastr.warning('Your passwords do not match!', 'Please try again', {
          timeOut: 1000,
        });
        return
      }

      this.auth.register(first_name,last_name,username,email,password).subscribe((res: any) => {
        console.log('res',res)
        this.toastr.success('You account has been created successfully!', 'Success', {
          timeOut: 1000, 
        });
        // setTimeout(() => {
        //     this.router.navigateByUrl("/auth/login");
        // }, 1500);
      });

      
      
    } else {

      this.toastr.error('Please check the form for errors.', 'Invalid Form');
      console.log(`error in form`)
    }
    
  }
}
