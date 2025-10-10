import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '@app/models/course.model';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent {
  @Input() courses: Course[] = [];
  @Input() editable: boolean = true;

  @Output() showCourse = new EventEmitter<Course>();
  @Output() editCourse = new EventEmitter<string>();
  @Output() deleteCourse = new EventEmitter<string>();

  onShow(courseId: string) {
    const course = this.courses.find(c => c.id === courseId);
    if(course) {
      this.showCourse.emit(course);
    }
  }

  onEdit(courseId: string) {
    this.editCourse.emit(courseId);
  }

  onDelete(courseId: string) {
    this.deleteCourse.emit(courseId);
  }
}
