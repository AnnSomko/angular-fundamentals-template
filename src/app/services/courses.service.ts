import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '@app/models/course.model';
import { Author } from '@app/models/author.model';

@Injectable({
    providedIn: 'root'
})

export class CoursesService {
    private readonly BASE_URL = 'http://localhost:4000/api';
    constructor(private http: HttpClient) { }

    getAll(): Observable<Course[]> {
        return this.http.get<Course[]>(`${this.BASE_URL}/courses/all`);
    }

    createCourse(course: Course) {
        return this.http.post<Course>(`${this.BASE_URL}/courses`, course);
    }

    editCourse(id: string, course: Course) {
        return this.http.put<Course>(`${this.BASE_URL}/courses/${id}`, course);
    }

    getCourse(id: string): Observable<Course> {
        return this.http.get<Course>(`${this.BASE_URL}/courses/${id}`);
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
        return this.http.post<Author>(`${this.BASE_URL}/authors`, { name });
    }

    getAuthorById(id: string): Observable<Author> {
        return this.http.get<Author>(`${this.BASE_URL}/authors/${id}`);
    }
}
