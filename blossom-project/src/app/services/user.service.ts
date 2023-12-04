import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject: BehaviorSubject<string | null>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    let storedUsername = null;

    // Check if the code is running on the browser
    if (isPlatformBrowser(this.platformId)) {
      storedUsername = localStorage.getItem('username');
    }

    this.currentUserSubject = new BehaviorSubject<string | null>(storedUsername);

    this.currentUser.subscribe(username => {
      if (isPlatformBrowser(this.platformId)) {
        if (username) {
          localStorage.setItem('username', username);
        } else {
          localStorage.removeItem('username');
        }
      }
    });
  }

  // The currentUser getter method exposes the BehaviorSubject as an observable using the asObservable() method. 
  // This allows components to subscribe to currentUser and reactively get updates whenever the current user changes.
  public get currentUser() {
    return this.currentUserSubject.asObservable();
  }

  public setCurrentUser(username: string): void {
    console.log("Setting current user to: " + username);
    this.currentUserSubject.next(username);
  }

  public clearCurrentUser(): void {
    this.currentUserSubject.next(null);
  }
}
