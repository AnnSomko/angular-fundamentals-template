import { Component, Input } from '@angular/core';
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
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent {
  @Input() course!: Course;

  getAuthorNames(): string[] {
    return this.course.authors.map(
      id => mockedAuthorsList.find(a => a.id === id)?.name || 'Unknown'
    );
  }
}
