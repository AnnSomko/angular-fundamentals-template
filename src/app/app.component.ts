import { Component } from '@angular/core';
import { mockedAuthorsList, mockedCoursesList } from './shared/mocks/mocks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'courses-app';
  courses = mockedCoursesList;
  authors = mockedAuthorsList;

  onShowCourse(title: string) {
    console.log('Show course clicked:', title);
  }

  onEditCourse(title: string) {
    console.log('Edit course clicked:', title);
  }

  onDeleteCourse(title: string) {
    console.log('Delete course clicked:', title);
  }
  
}