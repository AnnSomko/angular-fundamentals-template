import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '@app/services/courses.service';
import { Observable } from 'rxjs';

interface Course {
  id: string;
  title: string;
  description: string;
  creationDate: string | Date;
  duration: number;
  authors: string[];
}

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent implements OnInit {
  courseId!: string | null;
  course$!: Observable<Course>;

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private router: Router
  ) { }


  @Output() back = new EventEmitter<void>();

  ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get('id');
    if (this.courseId) {
      this.course$ = this.coursesService.getCourse(this.courseId);
    }
  }

  onBack() {
    this.router.navigate(['/courses']);
  }
}
