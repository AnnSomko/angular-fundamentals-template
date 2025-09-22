import { Component, EventEmitter, Input, Output } from '@angular/core';
import { mockedAuthorsList } from '@app/shared/mocks/mocks';

interface Course {
  id: string;
  title: string;
  description: string;
  creationDate: string | Date;
  duration: number;
  authors: string[];
}

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

  onShow(courseTitle: string) {
    this.showCourse.emit(courseTitle);
  }

  onEdit(courseTitle: string) {
    this.editCourse.emit(courseTitle);
  }

  onDelete(courseTitle: string) {
    this.deleteCourse.emit(courseTitle);
  }

  getAuthorNames(authorIds: string[]): string[] {
  return authorIds.map(id => mockedAuthorsList.find(a => a.id === id)?.name || '');
}
}
