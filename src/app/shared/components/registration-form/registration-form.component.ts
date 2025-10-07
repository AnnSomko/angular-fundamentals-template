import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent implements OnInit {
  registrationForm!: FormGroup;
  submitted = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.registrationForm.valid) {
      console.log('Form submitted:', this.registrationForm.value);

      this.authService.register(this.registrationForm.value).subscribe({
        next: (response) => {
          console.log('Registration successful, token:', response.token);
          this.router.navigate(['/courses']);
        },
        error: (error) => {
          console.error('Registration error:', error);
        }
      });
    } else {
      this.registrationForm.markAllAsTouched();
    }
  }
}
