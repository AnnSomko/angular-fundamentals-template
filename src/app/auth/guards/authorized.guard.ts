import { inject } from '@angular/core';
import {  Route, UrlSegment, Router, UrlTree, CanMatchFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const AuthorizedGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
): boolean | UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthorized ? true :router.createUrlTree(['/login']);
}
