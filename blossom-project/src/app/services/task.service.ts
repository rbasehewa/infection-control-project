import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private taskUrl = '/assets/dummy-data/task-list.json';

  constructor(private http: HttpClient) {}

  public getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.taskUrl).pipe(
      catchError((error) => {
        console.error('Error fetching tasks:', error);
        return throwError(error);
      })
    );
  }
}
