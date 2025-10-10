import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Course } from '@app/models/course.model';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit {
  @Input() course!: Course;
  @Input() editable: boolean = true;

  @Output() showCourse = new EventEmitter<string>();
  @Output() editCourse = new EventEmitter<string>();
  @Output() deleteCourse = new EventEmitter<string>();

  onShow() {
    this.showCourse.emit(this.course.id);
  }

  onEdit() {
    this.editCourse.emit(this.course.id);
  }

  onDelete() {
    this.deleteCourse.emit(this.course.id);
  }

  ngOnInit(): void {
    console.log("CourseCard editable:", this.editable, "course:", this.course);
  }
}
