import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, of } from 'rxjs';
import { SessionStorageService } from './session-storage.service';
import { LoginPayload, RegisterPayload, User } from '@app/models/user.model';
import { UserStoreService } from '@app/user/services/user-store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = "http://localhost:4000";
  private isAuthorized$$ = new BehaviorSubject<boolean>(
    !!this.sessionStorage.getToken()
  );
  public isAuthorized$: Observable<boolean> =
    this.isAuthorized$$.asObservable();

  constructor(
    private http: HttpClient,
    private sessionStorage: SessionStorageService,
    private userStore: UserStoreService
  ) { }

  public getToken(): string | null {
    return this.sessionStorage.getToken();
  }

  login(user: LoginPayload): Observable<any> {
    return this.http.post<any>(`${this.API_URL}/login`, user).pipe(
      tap((response) => {
        console.log('Login response:', response);
        if (response.result) {
          const token = response.result.replace(/^Bearer\s+/i, '');
          this.sessionStorage.setToken(token);
          console.log('Token saved in sessionStorage:', this.sessionStorage.getToken());
          this.isAuthorized$$.next(true);
          console.log('Token now saved:', response.token);
        }
      })
    );
  }

  logout(): void {
    this.sessionStorage.deleteToken();
    this.isAuthorized = false;
    this.userStore.clearUser();
  }

  register(user: RegisterPayload): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.API_URL}/register`, user).pipe(
      tap((response) => {
        if (response.token) {
          this.sessionStorage.setToken(response.token);
          this.isAuthorized = true;
        }
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
    return `${this.API_URL}/login`;
  }
}
