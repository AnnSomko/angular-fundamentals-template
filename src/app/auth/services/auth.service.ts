import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { SessionStorageService } from './session-storage.service';

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthorized$$ = new BehaviorSubject<boolean>(false);
  public isAuthorized$ = this.isAuthorized$$.asObservable();

  constructor(
    private http: HttpClient,
    private sessionStorage: SessionStorageService
  ) {
    const token = this.sessionStorage.getToken();
    this.isAuthorized$$.next(!!token);
  }

  login(user: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/api/login', user).pipe(
      tap((response) => {
        this.sessionStorage.setToken(response.token);
        this.isAuthorized = true;
      })
    );
  }

  logout(): void {
    this.sessionStorage.deleteToken();
    this.isAuthorized = false;
  }

  register(user: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/api/register', user).pipe(
      tap((response) => {
        this.sessionStorage.setToken(response.token);
        this.isAuthorized = true;
      })
    );
  }

  get isAuthorized(): boolean {
    return this.isAuthorized$$.value;
  }

  set isAuthorized(value: boolean) {
    this.isAuthorized$$.next(value);
  }

  getLoginUrl(): string {
    return '/login';
  }
}
