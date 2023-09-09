import { Component } from '@angular/core';

import {ModalService} from '../modal.service';
import { PostsService } from '../posts.service';



@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent {
  allpost = []
  constructor(
    private modalService: ModalService,
    private posts:PostsService
) {

  this.posts.getPosts().subscribe((data: any)=>{
    // console.log(data)
    this.allpost = data.posts;
    console.log(this.allpost)
  })
}

open() {
  this.modalService.open();
}

}
