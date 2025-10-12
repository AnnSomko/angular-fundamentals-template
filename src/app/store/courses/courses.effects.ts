import { Injectable } from '@angular/core';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, take, tap } from 'rxjs';
import * as CoursesActions from './courses.actions';
import { Store } from '@ngrx/store';
import { CoursesState } from './courses.reducer';
import { getAllCourses } from './courses.selectors';
import { Router } from '@angular/router';
import { Course } from '@app/models/course.model';

@Injectable()
export class CoursesEffects {
  constructor(
    private actions$: Actions,
    private coursesService: CoursesStoreService,
    private store: Store<CoursesState>,
    private router: Router
  ) { }

  getAll$ = createEffect(() => this.actions$.pipe(
    ofType(CoursesActions.requestAllCourses),
    mergeMap(() => this.coursesService.getAll()
      .pipe(
        map(response => (CoursesActions.requestAllCoursesSuccess({ courses: response.result }))),
        catchError((error) => of(CoursesActions.requestAllCoursesFail({ error })))
      )
    )
  ))

  filteredCourses$ = createEffect(() => this.actions$.pipe(
    ofType(CoursesActions.requestFilteredCourses),
    mergeMap(({ title }) => this.store.select(getAllCourses).pipe(
      take(1),
      map(allCourses => {
        const filtered = allCourses.filter(course =>
          course.title.toLowerCase().includes(title.toLowerCase())
        );

        return CoursesActions.requestFilteredCoursesSuccess({ courses: filtered });
      }),
      catchError(error => of(CoursesActions.requestFilteredCoursesFail({ error })))
    ))
  ))

  getSpecificCourse$ = createEffect(() => this.actions$.pipe(
    ofType(CoursesActions.requestSingleCourse),
    mergeMap(({ id }) => this.coursesService.getCourse(id)
      .pipe(
        map(course => (CoursesActions.requestSingleCourseSuccess({ course }))),
        catchError(error => of(CoursesActions.requestSingleCourseFail({ error })))
      ))
  ))

  deleteCourse$ = createEffect(() => this.actions$.pipe(
    ofType(CoursesActions.requestDeleteCourse),
    mergeMap(({ id }) => this.coursesService.deleteCourse(id)
      .pipe(
        map(() => (CoursesActions.requestAllCourses)),
        catchError(error => of(CoursesActions.requestDeleteCourseFail({ error })))
      ))
  ))

  editCourse$ = createEffect(() => this.actions$.pipe(
    ofType(CoursesActions.requestEditCourse),
    mergeMap(({ id, course }) => this.coursesService.editCourse(id, course)
      .pipe(
        map((updatedCourse) => CoursesActions.requestEditCourseSuccess({ course: updatedCourse })),
        catchError(error => of(CoursesActions.requestEditCourseFail({ error })))
      ))
  ))

  createCourse$ = createEffect(() => this.actions$.pipe(
    ofType(CoursesActions.requestCreateCourse),
    mergeMap(({ course }) => this.coursesService.createCourse(course as Course)
      .pipe(
        map((response) => CoursesActions.requestCreateCourseSuccess({ course: response.result })),
        catchError(error => of(CoursesActions.requestCreateCourseFail({ error })))
      ))
  ))

  redirectToTheCoursesPage$ = createEffect(() => this.actions$.pipe(
    ofType(
      CoursesActions.requestCreateCourseSuccess,
      CoursesActions.requestEditCourseSuccess,
      CoursesActions.requestSingleCourseFail
    ),
    tap(() => this.router.navigate(['/courses']))
  ),
    { dispatch: false })
}
