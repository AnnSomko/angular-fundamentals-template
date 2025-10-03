import { Component, EventEmitter, Input, Output } from '@angular/core';

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
export class CourseInfoComponent {
   @Input() course!: Course;

   @Output() back = new EventEmitter<void>();

    onBack() {
      this.back.emit();
    }
}
