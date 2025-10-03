import { UrlTree, Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const NotAuthorizedGuard: CanActivateFn = (): boolean | UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return !authService.isAuthorized ? true : router.createUrlTree(['/courses']);
};

