import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '@app/models/course.model';
import { mockedAuthorsList } from '@app/shared/mocks/mocks';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
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

  getAuthorNames(authorIds: string[]): string[] {
  return authorIds.map(id => mockedAuthorsList.find(a => a.id === id)?.name || '');
}
}
