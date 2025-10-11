import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Author } from '@app/models/author.model';
import { Course } from '@app/models/course.model';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {
  @Input() course!: Course;
  @Input() authors: Author[] = [];
  @Input() editable: boolean = true;

  @Output() showCourse = new EventEmitter<Course>();
  @Output() editCourse = new EventEmitter<string>();
  @Output() deleteCourse = new EventEmitter<string>();

  onShow() {
    this.showCourse.emit(this.course);
  }

  onEdit() {
    this.editCourse.emit(this.course.id);
  }

  onDelete() {
    this.deleteCourse.emit(this.course.id);
  }

  get authorNames(): string {
    if (!this.course?.authors?.length) return 'Authors';

    return this.course.authors
      .map(authorId => {
        const author = this.authors.find(a => a.id === authorId);
        return author ? author.name : 'Unknown';
      })
      .join(', ');
  }
}
