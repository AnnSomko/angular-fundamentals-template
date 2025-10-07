import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Course, CoursesResponse } from '@app/models/course.model';
import { Author } from '@app/models/author.model';

@Injectable({
    providedIn: 'root'
})

export class CoursesService {
    private readonly BASE_URL = 'http://localhost:4000';
    constructor(private http: HttpClient) { }

    getAll(): Observable<CoursesResponse> {
        return this.http.get<CoursesResponse>(`${this.BASE_URL}/courses/all`);
    }

    createCourse(course: Course): Observable<CoursesResponse> {
        return this.http.post<CoursesResponse>(`${this.BASE_URL}/courses/add`, course);
    }

    editCourse(id: string, course: Course): Observable<CoursesResponse> {
        return this.http.put<CoursesResponse>(`${this.BASE_URL}/courses/${id}`, course);
    }

    getCourse(id: string): Observable<CoursesResponse> {
        return this.http.get<CoursesResponse>(`${this.BASE_URL}/courses/${id}`);
    }

    deleteCourse(id: string): Observable<void> {
        return this.http.delete<void>(`${this.BASE_URL}/courses/${id}`);
    }

    filterCourses(value: string): Observable<Course[]> {
        return this.http.get<Course[]>(`${this.BASE_URL}/courses/filter?value=${value}`);
    }

    getAllAuthors(): Observable<Author[]> {
        return this.http.get<Author[]>(`${this.BASE_URL}/authors/all`);
    }

    createAuthor(name: string): Observable<Author> {
        return this.http.post<Author>(`${this.BASE_URL}/authors/add`, { name });
    }

    getAuthorById(id: string): Observable<Author> {
        return this.http.get<Author>(`${this.BASE_URL}/authors/${id}`);
    }
}
