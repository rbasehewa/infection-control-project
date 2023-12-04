import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, NgbModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  username: string | null = null;
  navbarOpen = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.currentUser.subscribe(username => {
      this.username = username;
      console.log(" this.username: " +  this.username); // Inside subscribe
    });

    console.log(" this.username" +  this.username);
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

}
