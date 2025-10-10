import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '@app/models/course.model';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { CoursesService } from '@app/services/courses.service';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent implements OnInit {
  @Input() course!: Course;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private coursesService: CoursesStoreService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
        this.coursesService.getCourse(id).subscribe((course) => {
        this.course = course;
      });
    }
  }
  
    onBack(): void {
    this.router.navigate(["/courses"]);
  }
}
