import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, map, Observable, tap } from 'rxjs';
import { CoursesService } from './courses.service';
import { Course, CoursesResponse } from '@app/models/course.model';
import { Author } from '@app/models/author.model';

@Injectable({
  providedIn: 'root'
})

export class CoursesStoreService {
  private courses$$ = new BehaviorSubject<Course[]>([]);
  public courses$ = this.courses$$.asObservable();

  private authors$$ = new BehaviorSubject<Author[]>([]);
  public authors$ = this.authors$$.asObservable();

  private loading$$ = new BehaviorSubject<boolean>(false);
  public loading$ = this.loading$$.asObservable();

  constructor(private coursesService: CoursesService) { }

  getAll() {
    this.loading$$.next(true);
    this.coursesService
      .getAll()
      .pipe(finalize(() => this.loading$$.next(false)))
      .subscribe({
        next: (response) => this.courses$$.next(response.result),
        error: () => this.courses$$.next([]),
      });
  }

  getCourse(id: string): Observable<Course> {
    return this.coursesService.getCourse(id).pipe(map(response => response.result));
  }

  createCourse(course: Course): void {
    this.loading$$.next(true);
    this.coursesService
      .createCourse(course)
      .pipe(finalize(() => this.loading$$.next(false)))
      .subscribe(() => this.getAll());
  }

  editCourse(id: string, course: Course): void {
    this.loading$$.next(true);
    this.coursesService
      .editCourse(id, course)
      ?.pipe(finalize(() => this.loading$$.next(false)))
      .subscribe(() => this.getAll());
  }

  deleteCourse(id: string): void {
    this.loading$$.next(true);
    this.coursesService
      .deleteCourse(id)
      ?.pipe(finalize(() => this.loading$$.next(false)))
      .subscribe(() => this.getAll());
  }

  filterCourses(value: string): void {
    if (value.trim() === "") {
      this.getAll();
      return;
    }
    this.loading$$.next(true);
    this.coursesService
      .getAll()
      .pipe(finalize(() => this.loading$$.next(false)))
      .subscribe({
        next: (response) => {
          const search = value.trim().toLowerCase();
          const filtered = response.result.filter((course) =>
            course.title.toLowerCase().includes(search)
          );
          this.courses$$.next(filtered);
        },
        error: () => this.courses$$.next([]),
      });
  }

  getAllAuthors(): void {
    this.loading$$.next(true);
    this.coursesService
      .getAllAuthors()
      .pipe(
        finalize(() => this.loading$$.next(false))
      )
      .subscribe({
        next: (authors) => this.authors$$.next(authors),
        error: () => this.authors$$.next([]),
      });
  }

  createAuthor(name: string): void {
    this.loading$$.next(true);
    this.coursesService.createAuthor(name)
      .pipe(
        tap(newAuthor => {
          this.authors$$.next([...this.authors$$.value, newAuthor]);
        })
      )
      .subscribe();
  }

  getAuthorById(id: string): Observable<Author> {
    this.loading$$.next(true);
    return this.coursesService.getAuthorById(id).pipe(
      finalize(() => this.loading$$.next(false))
    );
  }
}
