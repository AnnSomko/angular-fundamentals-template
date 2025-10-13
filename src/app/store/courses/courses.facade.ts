import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { CoursesState } from './courses.reducer';
import * as CoursesSelectors from './courses.selectors';
import * as CoursesActions from './courses.actions';
import { Course } from '@app/models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesStateFacade {
  isAllCoursesLoading$ = this.store.pipe(select(CoursesSelectors.isAllCoursesLoadingSelector))
  isSingleCourseLoading$ = this.store.pipe(select(CoursesSelectors.isSingleCourseLoadingSelector))
  isSearchingState$ = this.store.pipe(select(CoursesSelectors.isSearchingStateSelector))
  allCourses$ = this.store.pipe(select(CoursesSelectors.getAllCourses));
  errorMessage$ = this.store.pipe(select(CoursesSelectors.getErrorMessage));

  constructor(private store: Store<CoursesState>) { }

  course$(courseId: string) {
    return this.store.pipe(
      select(CoursesSelectors.getCourse(courseId))
    );
  }

  getCourse(courseId: string) {
    return this.store.pipe(
      select(CoursesSelectors.getCourse(courseId))
    );
  }

  
  getAllCourses() {
    this.store.dispatch(CoursesActions.requestAllCourses())
  }

  getSingleCourse(id: string) {
    this.store.dispatch(CoursesActions.requestSingleCourse({ id }))
  }

  getFilteredCourses(title: string) {
    this.store.dispatch(CoursesActions.requestFilteredCourses({ title }))
  }

  editCourse(id: string, course: Course) {
    this.store.dispatch(CoursesActions.requestEditCourse({ id: course.id, course }))
  }

  createCourse(course: Course) {
    this.store.dispatch(CoursesActions.requestCreateCourse({ course }))
  }

  deleteCourse(id: string) {
    this.store.dispatch(CoursesActions.requestDeleteCourse({ id }))
  }
}

