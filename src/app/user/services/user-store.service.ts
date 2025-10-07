import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User, UserService } from './user.service';

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
      this.userService.getUser()
      .pipe(
        tap({
          next: (user: User) => {
            this.name$$.next(user?.name || null);
            this.isAdmin$$.next(!!user?.isAdmin);
          },
          error: () => {
            this.name$$.next(null);
            this.isAdmin$$.next(false);
          },
        })
      )
      .subscribe();
    }

    get isAdmin() {
        return this.isAdmin$$.getValue();
    }

    set isAdmin(value: boolean) {
        this.isAdmin$$.next(value);
    }
}
