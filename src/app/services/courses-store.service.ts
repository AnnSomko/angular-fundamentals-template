import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CoursesService } from './courses.service';
import { Course } from '@app/models/course.model';
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

  getAll(): void {
    this.loading$$.next(true);
    this.coursesService.getAll().subscribe(courses => {
      console.log('courses from backend', courses);
      this.courses$$.next(courses);
      this.loading$$.next(false);
    });
  }

  getCourse(id: string): Observable<Course> {
    return this.coursesService.getCourse(id);
  }

  createCourse(course: Course): void {
    this.loading$$.next(true);
    this.coursesService.createCourse(course)
      .pipe(
        tap(newCourse => {
          this.courses$$.next([...this.courses$$.value, newCourse]);
          this.loading$$.next(false);
        })
      )
      .subscribe();
  }

  editCourse(id: string, course: Course): void {
    this.loading$$.next(true);
    this.coursesService.editCourse(id, course)
      .pipe(
        tap(updatedCourse => {
          const updated = this.courses$$.value.map(c => c.id === id ? updatedCourse : c);
          this.courses$$.next(updated);
          this.loading$$.next(false);
        })
      )
      .subscribe();
  }

  deleteCourse(id: string): void {
    this.loading$$.next(true);
    this.coursesService.deleteCourse(id)
      .pipe(
        tap(() => {
          const filtered = this.courses$$.value.filter(c => c.id !== id);
          this.courses$$.next(filtered);
          this.loading$$.next(false);
        })
      )
      .subscribe();
  }

  filterCourses(value: string): void {
    this.loading$$.next(true);
    this.coursesService.filterCourses(value)
      .subscribe(courses => {
        this.courses$$.next(courses);
        this.loading$$.next(false);
      });
  }

  getAllAuthors(): void {
    this.coursesService.getAllAuthors()
      .subscribe(authors => this.authors$$.next(authors));
  }

  createAuthor(name: string): void {
    this.coursesService.createAuthor(name)
      .pipe(
        tap(newAuthor => {
          this.authors$$.next([...this.authors$$.value, newAuthor]);
        })
      )
      .subscribe();
  }

  getAuthorById(id: string): Observable<Author> {
    return this.coursesService.getAuthorById(id);
  }
}
