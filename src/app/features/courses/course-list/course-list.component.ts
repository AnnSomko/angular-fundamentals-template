import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Author } from '@app/models/author.model';
import { Course } from '@app/models/course.model';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent {
  @Input() courses: Course[] = [];
  @Input() editable: boolean = false;

  @Output() showCourse = new EventEmitter<string>();
  @Output() editCourse = new EventEmitter<string>();
  @Output() deleteCourse = new EventEmitter<string>();

  onShow(courseId: string) {
    this.showCourse.emit(courseId);
  }

  onEdit(courseId: string) {
    this.editCourse.emit(courseId);
  }

  onDelete(courseId: string) {
    this.deleteCourse.emit(courseId);
  }
}
