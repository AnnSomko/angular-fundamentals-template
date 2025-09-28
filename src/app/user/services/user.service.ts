import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface User {
    id: string;
    name: string;
    email: string;
    role: 'ADMIN' | 'USER';
}

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private readonly BASE_URL = 'http://localhost:4000/api';

    constructor(private http: HttpClient) { }

    getUser(): Observable<User> {
        return this.http.get<User>(`${this.BASE_URL}/users/me`);
    }
}
