import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  private staffUrl = '/assets/dummy-data/staff-members.json';
  private vaccinesUrl = '/assets/dummy-data/vaccines.json';

  constructor(private http: HttpClient) {}

  public getStaffMembers(): Observable<any[]> {
    return this.http.get<any[]>(this.staffUrl).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Server error:', error);
    return throwError('please try again later.');
  }

  public getVaccines(): Observable<any[]> {
    return this.http.get<any[]>(this.vaccinesUrl);
  }
}
