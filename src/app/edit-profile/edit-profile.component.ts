import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  constructor(private User:UserService,private formBuilder: FormBuilder,private toastr: ToastrService,private http: HttpClient){}

  editUserForm!:FormGroup
  
  // my forms


  ngOnInit() {

  this.fetchUserProfile()

  this.editUserForm  = this.formBuilder.group({ 
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
      username: [null, Validators.required],
      profile_pic_url: [null, Validators.required], 
      bio: [null, Validators.required], 
      linkedin_url: [null, Validators.required], 
      facebook_url: [null, Validators.required], 
      website_url: [null, Validators.required], 
      instagram_url: [null, Validators.required], 
      twitter_url: [null, Validators.required],
  })

    
  }


  userProfileData: any;
  disableSubmitButton:boolean = false;

  fetchUserProfile(){
    const currentUrl = window.location.href;
    const urlParts = currentUrl.split('/');
    const usernameSegment = urlParts[urlParts.indexOf('profile') + 1];
    

    const storedUser = localStorage.getItem('user');
  
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const user_id = user.user_id;
      this.User.viewUser(user_id,user?.username).subscribe((response) =>{
        console.log(response.message[0])
        this.userProfileData = response.message[0];

        // let last_name = document.querySelector('#last_name') as HTMLInputElement
        // let username = document.querySelector('#username') as HTMLInputElement
        // let website_url = document.querySelector('#website_url') as HTMLInputElement
        // let linkedin_url = document.querySelector('#linkedin_url') as HTMLInputElement
        // let facebook_url = document.querySelector('#facebook_url') as HTMLInputElement
        // let instagram_url = document.querySelector('#instagram_url') as HTMLInputElement
        // let twitter_url = document.querySelector('#twitter_url') as HTMLInputElement
        // let bio = document.querySelector('#bio') as HTMLTextAreaElement
        

          this.editUserForm.get('first_name')?.setValue(this.userProfileData.first_name),
          this.editUserForm.get('last_name')?.setValue(this.userProfileData.last_name),
          this.editUserForm.get('username')?.setValue(this.userProfileData.username),
          this.editUserForm.get('bio')?.setValue(this.userProfileData.bio),
          this.editUserForm.get('linkedin_url')?.setValue(this.userProfileData.linkedin_url),
          this.editUserForm.get('facebook_url')?.setValue(this.userProfileData.facebook_url),
          this.editUserForm.get('website_url')?.setValue(this.userProfileData.website_url),
          this.editUserForm.get('instagram_url')?.setValue(this.userProfileData.instagram_url),
          this.editUserForm.get('twitter_url')?.setValue(this.userProfileData.twitter_url)    
      })
    }
  }

  
  onChange(event: Event) {
    
    const target = event.target! as HTMLInputElement
    const files = target.files
    if (files) {
      this.disableSubmitButton = true;
      console.log(files[0]);
      const formData = new FormData();

      formData.append("file", files[0]);
      // console.log(files[0]);
      
      formData.append("upload_preset", environment.upload_preset);
      formData.append("cloud_name", environment.cloud_name);

      this.http.post<{url: string}>(`https://api.cloudinary.com/v1_1/${environment.cloud_name}/image/upload`, formData)
        .subscribe(
          (data) => {
            this.editUserForm.get('profile_pic_url')?.setValue(data.url);
            console.log(this.editUserForm.value)
            if(data.url){
              this.disableSubmitButton = false;
            }
          },
          error => {
            console.log({ error });

          }
        )
    }
  }

  updateUserDetails(){

    console.log(this.editUserForm.value);
    

    const first_name = this.editUserForm.value.first_name;
    const last_name = this.editUserForm.value.last_name ?? '';
    const username = this.editUserForm.value.username ?? '';
    const profile_pic_url = this.editUserForm.value.profile_pic_url ?? '';
    const bio = this.editUserForm.value.bio ?? '';
    const linkedin_url = this.editUserForm.value.linkedin_url ?? '';
    const facebook_url = this.editUserForm.value.facebook_url ?? '';
    const website_url = this.editUserForm.value.website_url ?? '';
    const instagram_url = this.editUserForm.value.instagram_url ?? '';
    const twitter_url = this.editUserForm.value.twitter_url ?? '';

    // console.log(first_name,last_name,username,profile_pic_url,bio,linkedin_url,facebook_url,website_url,instagram_url,twitter_url)
// console.log("this"+ this.editUserForm.value);

    if(first_name.length<1 ,last_name.length<1 ,username.length<1){return}
    this.User.updateUserInfo(this.userProfileData.user_id,first_name,last_name,username,profile_pic_url,bio,linkedin_url,facebook_url,website_url,instagram_url,twitter_url).subscribe((response) =>{
      console.log(response.message)
    })    
  }



}
