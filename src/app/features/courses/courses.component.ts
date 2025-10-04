import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '@app/models/course.model';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { UserStoreService } from '@app/user/services/user-store.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]>;
  filteredCourses: Course[] = [];
  isAdmin$: Observable<boolean>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private coursesStore: CoursesStoreService,
    private userStore: UserStoreService
  ) {
    this.courses$ = this.coursesStore.courses$;
    this.isAdmin$ = this.userStore.isAdmin$;
  }

  ngOnInit() {
    this.coursesStore.getAll();
    this.courses$.subscribe(courses => this.filteredCourses = [...courses]);
  }

  onSearch(query: string) {
    this.filteredCourses = this.filteredCourses.filter(course =>
      course.title.toLowerCase().includes(query.toLowerCase())
    );
  }

  getAuthorNames(authors: string[]) {
    return authors.join(', ');
  }

  onShow(courseId: string) {
    this.router.navigate([`/courses/${courseId}`]);
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