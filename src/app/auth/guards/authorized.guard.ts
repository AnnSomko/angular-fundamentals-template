import { inject, Injectable } from '@angular/core';
import {  Route, UrlSegment, Router, UrlTree, CanMatchFn, CanLoad } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizedGuard implements CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]): boolean | UrlTree {
    if (this.authService.isAuthorized) {
      return true;
    } 
     
    return this.router.createUrlTree(['/login']);
  }
}


// export const AuthorizedGuard: CanMatchFn = (
//   route: Route,
//   segments: UrlSegment[]
// ): boolean | UrlTree => {
//   const authService = inject(AuthService);
//   const router = inject(Router);

//   return authService.isAuthorized ? true : router.createUrlTree(['/login']);
// }
