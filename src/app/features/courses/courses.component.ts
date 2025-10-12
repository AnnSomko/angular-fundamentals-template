import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from '@app/models/course.model';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { CoursesStateFacade } from '@app/store/courses/courses.facade';
import { UserStoreService } from '@app/user/services/user-store.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  courses$ = this.coursesFacade.allCourses$;
  authors$ = this.coursesStore.authors$;
  isLoading$ = this.coursesStore.loading$;
  isAdmin$ = this.userStore.isAdmin$;

  constructor(
    private router: Router,
    private coursesStore: CoursesStoreService,
    private userStore: UserStoreService,
    private coursesFacade: CoursesStateFacade
  ) {
    this.isAdmin$ = this.userStore.isAdmin$;
  }

  ngOnInit(): void {
    this.coursesFacade.getAllCourses();
    this.coursesStore.getAllAuthors();
  }

  onSearch(query: string) {
    const value = query.trim();
    if (value) {
      this.coursesFacade.getFilteredCourses(value);
    } else {
      this.coursesFacade.getAllCourses();
    }
  }

  onShow(course: Course) {
    this.router.navigate(["/courses", course.id]);
  }

  showList() {
    this.router.navigate(["/courses"]);
  }

  onEdit(courseId: string) {
    this.router.navigate([`/courses/edit/${courseId}`]);
  }

  onDelete(courseId: string) {
    this.coursesStore.deleteCourse(courseId);
  }

  onAddCourse() {
    this.router.navigate(['/courses/add']);
  }
}