import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserResponse } from '@app/models/user.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private readonly BASE_URL = 'http://localhost:4000';

    constructor(private http: HttpClient) { }

    getUser(): Observable<UserResponse> {
      console.log("UserService.getUser called");
      return this.http.get<UserResponse>(`${this.BASE_URL}/users/me`);
    }
}
