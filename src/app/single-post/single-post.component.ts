import { Component, HostListener } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModalService } from '../services/modal.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgConfirmService } from 'ng-confirm-box';


@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})

export class SinglePostComponent {

  singlePost: any = {};
  showCommentForm: boolean = false;
  postOptionsVisibility: boolean[] = [];

   // my forms
   commentPostForm = this.formBuilder.group({
    body: new FormControl('',[Validators.required])
  })
   subCommentForm = this.formBuilder.group({
    body: new FormControl('',[Validators.required])
  })

  constructor(
    private posts:PostsService,
    private route: ActivatedRoute,
     private router:Router,
     private toastr: ToastrService,
     private modalService : ModalService,
     private formBuilder : FormBuilder,
     private confirmService: NgConfirmService
     ){ }

  ngOnInit(){
    this.route.params.subscribe((params) => {
      const post_id = params['post_id'];
      this.fetchSinglePost(post_id);
    })
  }

  // onCommentFormBlur() {
  //   setTimeout(() => {
  //     const commentInputValue = (document.querySelector('#commentInput') as HTMLInputElement)?.value;
  //     if (!commentInputValue) {
  //       this.showCommentForm = false;
  //     }
  //   }, 0);
  // }
  

  fetchSinglePost(post_id:string){
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const user_id = user.user_id;

      this.posts.getSinglePost(post_id,user_id).subscribe((response) => {
        console.log(response)
        this.singlePost = response
      })
    }
  }

  likePost(post:any) {
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const user_id = user.user_id;

    if(!post.has_liked){
      // like post
      this.posts.likePost(user_id, post.post_id).subscribe((response) => {
      
        if (response.message=="liked") {
          post.likes_count += 1;
          // console.log(this.singlePost);
          
          post.has_liked = true
        } else {
          console.log(response.message)
        }
      });
    }else{
      // unlike post
      this.posts.unlikePost(user_id, post.post_id).subscribe((response) => {
        
        if (response.message=="unliked") {
          // console.log(this.singlePost);

          post.likes_count -= 1;
          post.has_liked = false
        } else {
          console.log(response.message)
        }
      });
    
    }
      
    } else {
      console.log('please login to like');
      
    }
  }

  likeComment(comment:any) {
    // console.log('comment'+ typeof(comment.comment_id.toString()));

    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const user_id = user.user_id;

    if(!comment.has_liked){
      
      // like post
      this.posts.likeComment(user_id, comment.comment_id.toString()).subscribe((response) => {
      
        if (response.message=="comment was liked") {
          comment.like_count += 1;
          // console.log(this.singlePost);
          
          comment.has_liked = true
        } else {
          console.log(response.message)
        }
      });
    }else{
      // unlike post
      this.posts.unlikeComment(user_id, comment.comment_id.toString()).subscribe((response) => {
        
        if (response.message=="unliked comment") {
          // console.log(this.singlePost);

          comment.like_count -= 1;
          comment.has_liked = false
        } else {
          console.log(response.message)
        }
      });
    
    }
      
    } else {
      console.log('please login to like');
      
    }
  }
  likeSubcomment(subcomment:any) {
    console.log('subcomment'+ subcomment.subcomment_id);

    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      const user = JSON.parse(storedUser);
      const user_id = user.user_id;

    if(!subcomment.has_liked){
      
      // like post
      this.posts.likeComment(user_id, subcomment.subcomment_id.toString()).subscribe((response) => {
      
        if (response.message=="comment was liked") {
          subcomment.like_count += 1;
          // console.log(this.singlePost);
          
          subcomment.has_liked = true
        } else {
          console.log(response.message)
        }
      });
    }else{
      // unlike post
      this.posts.unlikeComment(user_id, subcomment.subcomment_id.toString()).subscribe((response) => {
        
        if (response.message=="unliked comment") {
          // console.log(this.singlePost);

          subcomment.like_count -= 1;
          subcomment.has_liked = false
        } else {
          console.log(response.message)
        }
      });
    
    }
      
    } else {
      console.log('please login to like');
      
    }
  }

  viewUserProfile(username:string){
    this.router.navigate(['/profile', username]);
  }


  isMyPost(postUserId: string): boolean {
    const storedUser = localStorage.getItem('user');
  
    if (storedUser) {
      const user = JSON.parse(storedUser);
      return user.user_id === postUserId;
    }
  
    return false; 
  }

  isAdmin(){
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);      

      return user.is_admin
    }
  }

  postComment(post_id:string){
    const storedUser = localStorage.getItem('user');
      
      if(storedUser){
        const user = JSON.parse(storedUser);
        const user_id = user.user_id;

        const body = this.commentPostForm.value.body ?? '';

        this.posts.commentPost(post_id,user_id,body).subscribe((response)=>{
          console.log('res',response)
          this.toastr.success('Comment added');
        })
      }
  }
  addSubComment(post_id:string){
    const storedUser = localStorage.getItem('user');
      
      if(storedUser){
        const user = JSON.parse(storedUser);
        const user_id = user.user_id;

        const body = this.subCommentForm.value.body ?? '';

        if(body.length<1){
          this.toastr.show('make button inactive');
          return
        }

        this.posts.subCommentPost(post_id,user_id,body).subscribe((response)=>{
          console.log('res',response)
          this.toastr.success('subComment added');
        })
      }
  }

  deleteCurrentPost(post_id:string){
        
    this.confirmService.showConfirm("Are you sure want to delete this post?",
     () => {
      const storedUser = localStorage.getItem('user');
    
      if (storedUser) {
        console.log('delete no clicked');
        const user = JSON.parse(storedUser);
        const user_id = user.user_id;
        
        this.posts.deletePost(post_id, user_id).subscribe((response) => {
          console.log(response);
          
          if(response.message = "Post deleted successfully"){
            this.toastr.success('Post Deleted successfully!');
            this.router.navigate(['']);
          }

        })

      }
    },
    () => {
      console.log('no ');
      console.log('delete no clicked');
      
    })

    
    
    
  }


  @HostListener('document:click', ['$event'])
  handleClick(event: Event): void {
    // Iterate through each post and set its post options visibility to false
    for (let i = 0; i < this.postOptionsVisibility.length; i++) {
      this.postOptionsVisibility[i] = false;
    }
  }

  handleContainerClick(event: Event): void {
    event.stopPropagation(); // Prevent the click event from propagating to the document
  }



  openEditPostModal(index: number,post_id:string) {
    this.modalService.openEditPostModal();
    this.postOptionsVisibility[index] = false;
    const postToEdit = document.querySelector(`#post-body-${post_id}`) as HTMLParagraphElement
    const editPostTextbox = document.querySelector('.editPostBody') as HTMLTextAreaElement
    editPostTextbox.value = postToEdit.textContent as string;
    editPostTextbox.id = post_id
    console.log(postToEdit.textContent);
   
    
    

    // console.log('post data ' + postToEdit.textContent)
    // console.log(editPostTextbox.textContent)
  }
  closeEditPostModal() {
    this.modalService.closeEditPostModal();
  }

  // view post options function{toggle open and close}
  togglePostOptions(index: number) {
    this.postOptionsVisibility[index] = !this.postOptionsVisibility[index];
  }
  closePostOptions(index: number): void {
    this.postOptionsVisibility[index] = false;
  }


  // post: {
  //   post: {
  //     post_id: string;
  //     user_id: string;
  //     image: string;
  //     body: string;
  //     datetime: string;
  //     tagged_users: string;
  //     likes_count: number;
  //   }[];
  //   comments: {
  //     comment_id: number;
  //     user_id: string;
  //     body: string;
  //     datetime: string;
  //     like_count: number;
  //     subcomments: {
  //       subcomment_id: number;
  //       user_id: string;
  //       body: string;
  //       datetime: string;
  //       like_count: number;
  //     }[];
  //   }[];
  // } = {
  //   post: [
  //     {
  //       post_id: "90af0c8b-7ee7-48a8-a494-927c82598db3",
  //       user_id: "unregistered_user",
  //       image: "https://cdn.pixabay.com/photo/2023/08/20/20/03/planes-8203121_1280.jpg",
  //       body: "Exploring hidden gems in the heart of the city 🌆✨ Just stumbled upon this charming café tucked away on a quiet street. The cozy ambiance and delicious aroma of freshly brewed coffee are giving me all the feels. ☕️❤️ Sometimes, it's the unplanned moments that turn into the best memories. #UrbanAdventures #CaféHunting #CityDiscoveries",
  //       datetime: "9/3/2023, 11:06:47 AM",
  //       tagged_users: "",
  //       likes_count: 0
  //     }
  //   ],
  //   comments: [
  //     {
  //       comment_id: 1,
  //       user_id: "unregistered_user",
  //       body: "Exploring hidden gems in the heart of the city 🌆✨ Just stumbled upon this charming café tucked away on a quiet street. The cozy ambiance and delicious aroma of freshly brewed coffee are giving me all the feels. ☕️❤️ Sometimes, it's the unplanned moments that turn into the best memories. #UrbanAdventures #CaféHunting #CityDiscoveries",
  //       datetime: "9/3/2023, 11:58:02 AM",
  //       like_count: 1,
  //       subcomments: [
  //         {
  //           subcomment_id: 1,
  //           user_id: "silomaben",
  //           body: "Exploring hidden gems in the heart of the city 🌆✨ Just stumbled upon this charming café tucked away on a quiet street. The cozy ambiance and delicious aroma of freshly brewed coffee are giving me all the feels. ☕️❤️ Sometimes, it's the unplanned moments that turn into the best memories. #UrbanAdventures #CaféHunting #CityDiscoveries",
  //           datetime: "9/3/2023, 12:17:52 PM",
  //           like_count: 1
  //         }
  //       ]
  //     },
  //     {
  //       comment_id: 2,
  //       user_id: "42plus0",
  //       body: "Exploring hidden gems in the heart of the city 🌆✨ Just stumbled upon this charming café tucked away on a quiet street. The cozy ambiance and delicious aroma of freshly brewed coffee are giving me all the feels. ☕️❤️ Sometimes, it's the unplanned moments that turn into the best memories. #UrbanAdventures #CaféHunting #CityDiscoveries",
  //       datetime: "9/3/2023, 11:58:02 AM",
  //       like_count: 1,
  //       subcomments: [
  //         {
  //           subcomment_id: 1,
  //           user_id: "seshAmbasador",
  //           body: "Exploring hidden gems in the heart of the city 🌆✨ Just stumbled upon this charming café tucked away on a quiet street. The cozy ambiance and delicious aroma of freshly brewed coffee are giving me all the feels. ☕️❤️ Sometimes, it's the unplanned moments that turn into the best memories. #UrbanAdventures #CaféHunting #CityDiscoveries",
  //           datetime: "9/3/2023, 12:17:52 PM",
  //           like_count: 1
  //         }
  //       ]
  //     },
  //     {
  //       comment_id: 3,
  //       user_id: "silomaben",
  //       body: "Exploring hidden gems in the heart of the city 🌆✨ Just stumbled upon this charming café tucked away on a quiet street. The cozy ambiance and delicious aroma of freshly brewed coffee are giving me all the feels. ☕️❤️ Sometimes, it's the unplanned moments that turn into the best memories. #UrbanAdventures #CaféHunting #CityDiscoveries",
  //       datetime: "9/3/2023, 11:58:02 AM",
  //       like_count: 1,
  //       subcomments: [
  //         {
  //           subcomment_id: 1,
  //           user_id: "johndoe",
  //           body: "Exploring hidden gems in the heart of the city 🌆✨ Just stumbled upon this charming café tucked away on a quiet street. The cozy ambiance and delicious aroma of freshly brewed coffee are giving me all the feels. ☕️❤️ Sometimes, it's the unplanned moments that turn into the best memories. #UrbanAdventures #CaféHunting #CityDiscoveries",
  //           datetime: "9/3/2023, 12:17:52 PM",
  //           like_count: 1
  //         }
  //       ]
  //     }
  //   ]
  // };

}

