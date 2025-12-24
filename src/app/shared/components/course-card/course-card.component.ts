import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() creationDate!: string | Date;
  @Input() duration!: number;
  @Input() authors: string[] = [];
  @Input() editable: boolean = false;

  @Output() clickOnShow = new EventEmitter<void>();
  @Output() editCourse = new EventEmitter<string>();
  @Output() deleteCourse = new EventEmitter<string>();

  showCourse() {
    this.clickOnShow.emit();
  }
}
