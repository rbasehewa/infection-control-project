import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, NgbAccordionModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent {
  @Input() task!: Task;
  @Output() onComplete = new EventEmitter<Task>();

  public completeTask() {
    this.onComplete.emit(this.task);
  }

}

