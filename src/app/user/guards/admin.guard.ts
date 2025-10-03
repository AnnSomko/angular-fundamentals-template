import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { UserStoreService } from '@app/user/services/user-store.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private userStore: UserStoreService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    if (this.userStore.isAdmin) {
      return of(true);
    } else {
      return of(this.router.parseUrl('/courses'));
    }
  }
}
