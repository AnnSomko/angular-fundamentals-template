import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Author } from '@app/models/author.model';
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
  authors$: Author[] = [];
  authorsList: any;

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

    this.coursesStore.getAllAuthors();
    this.coursesStore.authors$.subscribe(authors => {
      this.authorsList = authors || [];
    });
  }

  onSearch(query: string) {
    this.filteredCourses = this.filteredCourses.filter(course =>
      course.title.toLowerCase().includes(query.toLowerCase())
    );
  }

  onShow(courseId: string) {
    this.router.navigate([`/courses/show/${courseId}`]);
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

  getAuthorNames(authorIds: string[]) {
    if (!authorIds || !this.authors$ || this.authorsList.length === 0) {
      return '';
    }

    return authorIds
      .map(id => this.authorsList.find((a: { id: string; }) => a.id === id)?.name || '')
      .filter(name => !!name)
      .join(', ');
  }
}