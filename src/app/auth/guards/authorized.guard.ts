import { inject, Injectable } from '@angular/core';
import { Route, UrlSegment, Router, UrlTree, CanLoad, CanMatchFn, CanMatch } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizedGuard implements CanMatch {
  constructor(private auth: AuthService, private router: Router) {}

  canMatch(route: Route, segments: UrlSegment[]): boolean | UrlTree {
    return this.auth.isAuthorized$ ? true : this.router.parseUrl('/login');
  }
}
