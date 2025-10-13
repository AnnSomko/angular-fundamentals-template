import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '@app/models/course.model';
import { CoursesStateFacade } from '@app/store/courses/courses.facade';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent implements OnInit {
  course$!: Observable<Course | undefined>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private coursesFacade: CoursesStateFacade
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.coursesFacade.getSingleCourse(id);
      this.course$ = this.coursesFacade.course$(id);
    };
  };


  onBack(): void {
    this.router.navigate(["/courses"]);
  }
}
