import { UrlTree, Router, CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotAuthorizedGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    if (!this.authService.isAuthorized) {
      return true;
    }
 
    return this.router.createUrlTree(['/courses']);
  }
}

// export const NotAuthorizedGuard: CanActivateFn = (): boolean | UrlTree => {
//   const authService = inject(AuthService);
//   const router = inject(Router);
//   return !authService.isAuthorized ? true : router.createUrlTree(['/courses']);
// };

