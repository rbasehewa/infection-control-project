import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { StaffComponent } from '../staff/staff.component';
import { TaskListComponent } from '../task-list/task-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    CommonModule,
    NgbNavModule,
    TaskListComponent,
    StaffComponent,
    RouterModule
  ]
})
export class HomeComponent {}
