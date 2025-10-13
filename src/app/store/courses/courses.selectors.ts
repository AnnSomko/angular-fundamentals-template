import { createFeatureSelector, createSelector } from "@ngrx/store";
import { coursesFeatureKey, CoursesState } from "./courses.reducer";

export const selectFeature = createFeatureSelector<CoursesState>(coursesFeatureKey)

export const isAllCoursesLoadingSelector = createSelector(
  selectFeature,
  (state: CoursesState) => state.isAllCoursesLoading
)

export const isSearchingStateSelector = createSelector(
  selectFeature,
  (state: CoursesState) => state.isSearchState
)

export const isSingleCourseLoadingSelector = createSelector(
  selectFeature,
  (state: CoursesState) => state.isSingleCourseLoading
)

export const getCourses = createSelector(
  selectFeature,
  (state: CoursesState) => state.allCourses // -- ??
)

export const getAllCourses = createSelector(
  selectFeature,
  (state: CoursesState) => state.allCourses // -- ??
)

export const getCourse = (courseId: string) => createSelector(
  selectFeature,
  (state: CoursesState) => state.allCourses.find(course => course.id === courseId)
)

export const getErrorMessage = createSelector(
  selectFeature,
  (state: CoursesState) => state.errorMessage
)