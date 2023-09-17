import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  constructor(private userService: UserService, private router:Router) {}

  fetchedUsers: any = [];
  filteredSearch: any = [];
  searchText: string = ''; 

  ngOnInit() {
    this.getUsers();
  }

  viewUserProfile(username:string){
    this.router.navigate(['/profile', username]);
  }

  filterResults() {
    const text = this.searchText.trim().toLowerCase();

    if (!text) {
      this.filteredSearch = this.fetchedUsers;
    } else {
      this.filteredSearch = this.fetchedUsers.filter(
        (user: any) =>
          user?.username.toLowerCase().includes(text) ||
          (user.first_name + ' ' + user.last_name).toLowerCase().includes(text)
      );
    }
  }

  getUsers() {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      const user = JSON.parse(storedUser);
      const user_id = user.user_id;
      this.userService.getAllUsers(user_id).subscribe((response) => {
        this.fetchedUsers = response.users;
        this.filteredSearch = this.fetchedUsers;
      });
    }
  }
}
