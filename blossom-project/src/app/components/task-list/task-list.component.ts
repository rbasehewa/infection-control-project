import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { TaskStatus } from '../../models/enum/task-status.enum';
import { HttpClientModule } from '@angular/common/http';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { TaskComponent } from '../task/task.component';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, NgbAccordionModule, TaskComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService
      .getTasks()
      .pipe(
        catchError((error) => {
          console.error('Error fetching tasks:', error);
          return throwError(error);
        })
      )
      .subscribe((tasks: Task[]) => {
        this.tasks = tasks.map((task) => ({
          ...task,
          dueDate: new Date(task.dueDate),
        }));
      });
  }

  public markAsComplete(task: Task): void {
    if (task && task.status !== TaskStatus.Completed) {
      task.status = TaskStatus.Completed;
    }
  }

  public toggleDetails(task: Task): void {
    task.showDetails = !task.showDetails;
    this.tasks.forEach((t) => {
      if (t.id !== task.id) {
        t.showDetails = false; // Close other tasks
      }
    });
  }

  public trackTaskById(index: number, task: Task): any {
    return task.id;
  }
}
