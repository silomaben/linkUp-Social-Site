import { Component } from '@angular/core';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent {
  navigateTo: string = 'posts'; // Default to 'posts'

  // Function to change the active tab
  setActiveTab(tab: string) {
    this.navigateTo = tab;
  }
}
