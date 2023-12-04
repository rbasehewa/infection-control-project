import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private userService: UserService) {}

  login() {
    if (this.username && this.password) {

      // This should be replaced with a real authentication service call
      if (this.username === 'test' && this.password === 'test') {
        this.userService.setCurrentUser(this.username);
        this.router.navigate(['/tasks']);
      } else {
        this.errorMessage = 'Incorrect username or password.';
      }
    } else {
      this.errorMessage = 'Please enter both username and password.';
    }
  }
}
