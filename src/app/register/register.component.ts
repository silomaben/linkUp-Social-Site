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

    const invalidCharactersPattern = /[.,<>?:;[\]{}\\=_]/;

    if (invalidCharactersPattern.test(first_name) || invalidCharactersPattern.test(last_name)) {
      this.toastr.warning('One or both names contain invalid characters!')
      return
    } 

    if(first_name.length < 3){
      this.toastr.warning('Firstname must be more than 3 characters!', 'Invalid form', {
        timeOut: 1000,
      });
      return
    } else if(last_name.length < 3){
      this.toastr.warning('Last name must be more than 3 characters!', 'Invalid form', {
        timeOut: 1000,
      });
      return
    } else if(username.length < 3){
      this.toastr.warning('Username must be more than 3 characters!', 'Invalid form', {
        timeOut: 1000,
      });
      return
    }
    
    if( this.registerForm.valid){

      if(password !== confirmPassword){
        this.toastr.warning('Your passwords do not match!', 'Please try again', {
          timeOut: 1000,
        });
        return
      }

      this.auth.register(first_name,last_name,username,email,password).subscribe((res: any) => {
        console.log('res',res)
        this.toastr.success('Your account has been created successfully', 'Success', {
          timeOut: 1000, 
        });
        setTimeout(() => {
            this.router.navigateByUrl("/auth/login");
        }, 1500);
      },
      (error) => {
        // console.log(error.error.error);
        
        if (error.error.error === 'The email provided is already registered.') {
          this.toastr.error('The email provided is already registered!', 'Error', {
            timeOut: 3000, 
          });
        } else {
          console.error('Unexpected error:', error);
        }
      });

      
      
    } else {

      this.toastr.error('Invalid email format', 'Invalid Form');
      console.log(`error in form`)
    }
    
  }
}
