import { Course } from '@app/models/course.model';
import { Action, createReducer, on } from '@ngrx/store';
import * as CoursesActions from './courses.actions';

export const coursesFeatureKey = "courses";

export interface CoursesState {
  allCourses: Course[];
  course: Course | null;
  isAllCoursesLoading: boolean;
  isSingleCourseLoading: boolean;
  isSearchState: boolean;
  errorMessage: string | null;
}

export const initialState: CoursesState = {
  allCourses: [],
  course: null,
  isAllCoursesLoading: true,
  isSingleCourseLoading: false,
  isSearchState: false,
  errorMessage: ""
};

export const coursesReducer = createReducer(
  initialState,
  on(CoursesActions.requestAllCourses, (state) => ({
    ...state,
    isAllCoursesLoading: true,
    isSearchState: false
  })),
  on(CoursesActions.requestAllCoursesSuccess, (state, { courses }) => ({
    ...state,
    allCourses: courses,
    isAllCoursesLoading: false,
  })),
  on(CoursesActions.requestAllCoursesFail, (state, { error }) => ({
    ...state,
    isAllCoursesLoading: false,
    errorMessage: error
  })),


  on(CoursesActions.requestSingleCourse, (state) => ({
    ...state,
    isSingleCourseLoading: true,
    errorMessage: null,
  })),
  on(CoursesActions.requestSingleCourseSuccess, (state, { course }) => ({
    ...state,
    course: course as Course,
    isSingleCourseLoading: false
  })),
  on(CoursesActions.requestSingleCourseFail, (state, { error }) => ({
    ...state,
    course: null,
    isSingleCourseLoading: false,
    errorMessage: error
  })),


  on(CoursesActions.requestFilteredCourses, (state, { title }) => ({
    ...state,
    isAllCoursesLoading: true,
    isSearchState: true,
    errorMessage: null
  })),
  on(CoursesActions.requestFilteredCoursesSuccess, (state, { courses }) => ({
    ...state,
    allCourses: courses as Course[],
    isAllCoursesLoading: false
  })),
  on(CoursesActions.requestFilteredCoursesFail, (state, { error }) => ({
    ...state,
    isAllCoursesLoading: false,
    errorMessage: error
  })),


  on(CoursesActions.requestDeleteCourse, (state) => ({
    ...state,
    isAllCoursesLoading: true,
    errorMessage: ""
  })),
  on(CoursesActions.requestDeleteCourseSuccess, state => ({
    ...state 
  })),
  on(CoursesActions.requestDeleteCourseFail, (state, { error }) => ({
    ...state,
    isAllCoursesLoading: false,
    errorMessage: error
  })),


  on(CoursesActions.requestEditCourse, (state, { course }) => ({
    ...state,
    isSingleCourseLoading: true,
    errorMessage: ""
  })),
  on(CoursesActions.requestEditCourseSuccess, (state, { course }) => ({
    ...state,
    allCourses: state.allCourses.map(c => c.id === course.id ? (course as Course) : c),
    isSingleCourseLoading: false
  })),
  on(CoursesActions.requestEditCourseFail, (state, { error }) => ({
    ...state,
    isSingleCourseLoading: false,
    errorMessage: error
  })),


  on(CoursesActions.requestCreateCourse, (state, { course }) => ({
    ...state,
    course: course as Course,
    isSingleCourseLoading: true,
    errorMessage: ""
  })),
  on(CoursesActions.requestCreateCourseSuccess, (state, { course }) => ({
    ...state,
    allCourses: [...state.allCourses, course as Course],
    isSingleCourseLoading: false
  })),
  on(CoursesActions.requestCreateCourseFail, (state, { error }) => ({
    ...state,
    isSingleCourseLoading: false,
    errorMessage: error
  })),
);

export const reducer = (state: CoursesState, action: Action): CoursesState => coursesReducer(state, action);
