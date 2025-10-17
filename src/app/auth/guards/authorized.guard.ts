import { Injectable } from '@angular/core';
import { Route, UrlSegment, Router, UrlTree, CanLoad, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizedGuard implements CanLoad, CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canLoad(): boolean | UrlTree {
    return this.auth.isAuthorized ? true : this.router.parseUrl('/login');
  }

  canActivate(): boolean | UrlTree {
    return this.auth.isAuthorized ? true : this.router.parseUrl('/login');
  }
}
