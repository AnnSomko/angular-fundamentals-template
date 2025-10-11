import { Component, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';
import { SessionStorageService } from '@app/auth/services/session-storage.service';
import { UserStoreService } from '@app/user/services/user-store.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @ViewChild("loginForm") public loginForm!: NgForm;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private userStore: UserStoreService,
    private router: Router
  ) { }

  onSubmit(form: NgForm) {
    console.log('Form submitted', form.value);
    if (form.valid) {
      const { email, password } = form.value;

      this.authService.login({ email, password }).subscribe({
        next: () => {
          this.userStore.getUser();
          console.log('Token now:', sessionStorage.getItem('token'));
          this.router.navigate(['/courses']);
        },
        error: () => this.errorMessage = 'Invalid email or password'
      });


    } else {
      this.errorMessage = 'Form is invalid';
    }
  }
}