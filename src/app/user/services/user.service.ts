import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface User {
  email: string;
  name: string | null;
  isAdmin: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private readonly BASE_URL = 'http://localhost:4000';

    constructor(private http: HttpClient) { }

    getUser(): Observable<User> {
      return this.http.get<User>(`${this.BASE_URL}/users/me`);
    }
}
