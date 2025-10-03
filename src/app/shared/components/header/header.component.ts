import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isAuthorized$: Observable<boolean>;

  constructor(private authService: AuthService, private router: Router) {
    this.isAuthorized$ = this.authService.isAuthorized$;
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
