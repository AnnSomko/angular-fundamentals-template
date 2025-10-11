import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';
import { UserStoreService } from '@app/user/services/user-store.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isAuthorized$: Observable<boolean>;
  name$: Observable<string | null>;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private userStore: UserStoreService
  ) {
    this.isAuthorized$ = this.authService.isAuthorized$;
    this.name$ = this.userStore.name$
  }

  onAuthButtonClick() {
    if (this.authService.isAuthorized) {
      this.authService.logout();
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
