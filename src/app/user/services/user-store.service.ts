import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private name$$ = new BehaviorSubject<string | null>(null);
  private isAdmin$$ = new BehaviorSubject<boolean>(false);

  public name$: Observable<string | null> = this.name$$.asObservable();
  public isAdmin$: Observable<boolean> = this.isAdmin$$.asObservable();

  constructor(private userService: UserService) { }

  getUser() {
    this.userService
      .getUser()
      .pipe(map((res) => res.result))
      .subscribe({
        next: (user) => {
          console.log("USER FROM BACKEND:", user);
          this.name$$.next(user.name);
          const isAdmin = !!(user.role && user.role.toLowerCase() === "admin");
          this.isAdmin$$.next(isAdmin);
          console.log("isAdmin:", isAdmin);
        },
         error: (err) => {
          console.log("getUser error:", err);
          this.name$$.next("");
          this.isAdmin$$.next(false);
        }
      })

  }

  get isAdmin() {
    return this.isAdmin$$.value;
  }

  set isAdmin(value: boolean) {
    this.isAdmin$$.next(value);
  }
}
