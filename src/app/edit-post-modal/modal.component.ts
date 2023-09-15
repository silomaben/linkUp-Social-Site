import {Component, OnInit} from '@angular/core';

import {Observable} from 'rxjs';

import {ModalService} from '../services/modal.service';
import { PostsService } from '../services/posts.service';
import { FormControl, FormGroup,FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  createPostForm = this.formBuilder.group({
    body: new FormControl('',[Validators.required]),
    image: new FormControl(''),
    tagged: new FormControl(''),
  })
  
  display$!: Observable<'open' | 'close'>;

  constructor(
      private modalService: ModalService,
      private posts:PostsService,
      private http: HttpClient,
      private toastr: ToastrService,
      private formBuilder: FormBuilder
  ) {}



  sendPost(){
    if(this.createPostForm.valid){
      const storedUser = localStorage.getItem('user');
      
      if(storedUser){
        const user = JSON.parse(storedUser);
        const user_id = user.user_id;

        const body = this.createPostForm.value.body ?? '';
        const image = this.createPostForm.value.image ?? '';
        const tagged = this.createPostForm.value.tagged ?? '';
        
        this.posts.createPost(user_id,image,body,tagged).subscribe((response)=>{
          console.log('res',response)
          this.toastr.success('Post uploaded successfully!', 'Success');
        })
      }
    }
  }




onChange(event: Event) {
  const target = event.target! as HTMLInputElement
  const files = target.files
  if (files) {
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
          console.log(data.url)
        },
        error => {
          console.log({ error });

        }
      )
  }
}

  ngOnInit() {
    this.display$ = this.modalService.watch();
  }

  close() {
    this.modalService.close();
  }
}