import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { UserStoreService } from '../services/user-store.service';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    constructor(
    private userStore: UserStoreService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.userStore.isAdmin$.pipe(
      map(isAdmin => {
        if (isAdmin) {
          return true;
        } else {
          return this.router.createUrlTree(['/courses']);
        }
      })
    );
  }
}
