import { Component } from '@angular/core';

import {ModalService} from '../modal.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent {
  constructor(
    private modalService: ModalService
) {}

open() {
  this.modalService.open();
}

}
