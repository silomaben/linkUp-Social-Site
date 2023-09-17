import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import {Observable} from 'rxjs';

import {ModalService} from '../services/modal.service';
import { PostsService } from '../services/posts.service';
import { FormControl, FormGroup,FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { ToastrService } from 'ngx-toastr';
import { FeedComponent } from '../feed/feed.component';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  // @Output() userBanned = new EventEmitter<void>();

  
  // my forms
  createPostForm = this.formBuilder.group({
    body: new FormControl('',[Validators.required]),
    image: new FormControl(''),
    tagged: new FormControl(''),
  })

  editPostForm = this.formBuilder.group({
    body: new FormControl('',[Validators.required]),
    tagged: new FormControl(''),
  })

  barnUserPassword = this.formBuilder.group({
    password: new FormControl('',[Validators.required]),
  })


  // my observables  
  displayCreatePostModal$!: Observable<'open' | 'close'>;
  displayEditPostModal$!: Observable<'open' | 'close'>;
  displaySettingsModal$!: Observable<'open' | 'close'>;
  displayBarnUserModal$!: Observable<'open' | 'close'>;
  displayUnbarnUserModal$!: Observable<'open' | 'close'>;

  // state variable
  disableSubmitButton:boolean = false;

  constructor(
      private modalService: ModalService,
      private posts:PostsService,
      private http: HttpClient,
      private toastr: ToastrService,
      private formBuilder: FormBuilder,
      private router: Router,
      private auth: AuthService,
      private User: UserService
      // private feed: FeedComponent
  ) {}


  // my functions
  sendPost(){
    if(this.createPostForm.valid){
      const storedUser = localStorage.getItem('user');
      
      if(storedUser){
        const user = JSON.parse(storedUser);
        const user_id = user.user_id;

        const body = this.createPostForm.value.body ?? '';
        const image = this.createPostForm.value.image ?? '';
        const tagged = this.createPostForm.value.tagged ?? '';

        if (body.length <=0){
          return
        }
        
        this.posts.createPost(user_id,image,body,tagged).subscribe((response)=>{
          console.log('res',response)
          if(response.message=="Posted successfully"){
            this.closeCreatePostModal()
            this.toastr.success('Post uploaded successfully!', 'Success');
            this.router.navigateByUrl("/login");
            this.User.triggerRefresh()
            // this.router.navigateByUrl("/login");
            // this.feed.getPosts()
            localStorage.setItem('modal_status', 'true')
          }else if(response.message=="Posting failed due to profanity"){
            this.toastr.error('Post rejected. Please avoid profanity in your post', );
          }
          
        })
      }
    }
  }


  // *******************************     used ngrx     ********************************************
  editCurrentPost(){
    const storedUser = localStorage.getItem('user');
      
    if(storedUser){
      const user = JSON.parse(storedUser);
      const user_id = user.user_id;

      const body = this.editPostForm.value.body ?? '';
      const tagged = this.editPostForm.value.tagged ?? '';
      const editPostTextbox = document.querySelector('.editPostBody') as HTMLTextAreaElement
      const post_id:string = editPostTextbox.id
      console.log(post_id);
      

      this.posts.editPost(user_id,post_id,body,tagged).subscribe((response)=>{
        console.log('res',response)
        this.toastr.success('Post updated successfully!', 'Success');
        this.closeEditPostModal()
      })

      
      
    };
  }

  updateSettings(){

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
            this.createPostForm.patchValue({image:data.url});
            // console.log(data.url)
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

  suspendUser(){
    const storedUser = localStorage.getItem('user');
    const barn_who = localStorage.getItem('barnWho')
      
    if(storedUser && barn_who){
      const user = JSON.parse(storedUser);
      const user_id = user.user_id;

      const password = this.barnUserPassword.value.password ?? '';

      this.auth.barnUser(user_id,password,barn_who).subscribe((response)=>{
        console.log(response);
        if(response.message == 'User banned successfully'){
          this.toastr.success('User is now banned', 'Success', {
            timeOut: 2000, 
          });

          this.closeBarnUserModal()
          // this.userBanned.emit();
          this.User.triggerRefresh()
        }
        
        
      })
  }
  }

  unSuspendUser(){
    const storedUser = localStorage.getItem('user');
    const unbarn_who = localStorage.getItem('unbarnWho')
      
    if(storedUser && unbarn_who){
      const user = JSON.parse(storedUser);
      const user_id = user.user_id;

      const password = this.barnUserPassword.value.password ?? '';

      this.auth.unbarnUser(user_id,password,unbarn_who).subscribe((response)=>{
        console.log(response);
        if(response.message == 'User unbanned successfully'){
          this.toastr.success('User is now unbanned', 'Success', {
            timeOut: 2000, 
          });
          this.closeUnbarnUserModal()
          // this.userBanned.emit();
          this.User.triggerRefresh()

          
        }
        
        
      })
  }
  }




  ngOnInit() {
    this.displayCreatePostModal$ = this.modalService.watchCreatePostModal();
    this.displayEditPostModal$ = this.modalService.watchEditPostModal();
    this.displaySettingsModal$ = this.modalService.watchSettingsModal();
    this.displayBarnUserModal$ = this.modalService.watchBarnUserModal();
    this.displayUnbarnUserModal$ = this.modalService.watchUnbarnUserModal();
  }

  closeCreatePostModal() {
    this.modalService.closeCreatePostModal();
  }
  closeEditPostModal() {
    this.modalService.closeEditPostModal();
  }

  closeSettingsModal() {
    this.modalService.closeSettingsModal();
  }
  closeBarnUserModal() {
    this.modalService.closeBarnUserModal();
  }
  closeUnbarnUserModal() {
    this.modalService.closeUnbarnUserModal();
  }
}