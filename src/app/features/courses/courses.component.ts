import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from '@app/models/course.model';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { UserStoreService } from '@app/user/services/user-store.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  courses$ = this.coursesStore.courses$;
  isLoading$ = this.coursesStore.loading$;
  isAdmin$ = this.userStore.isAdmin$;

  searchValue: string = "";

  constructor(
    private router: Router,
    private coursesStore: CoursesStoreService,
    private userStore: UserStoreService
  ) {
    this.courses$ = this.coursesStore.courses$;
    this.isAdmin$ = this.userStore.isAdmin$;
  }

  ngOnInit(): void {
    this.coursesStore.getAll();
    this.userStore.getUser();
  }

  onSearch() {
    const value = this.searchValue.trim();
    if (value) {
      this.coursesStore.filterCourses(value);
    } else {
      this.coursesStore.getAll();
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