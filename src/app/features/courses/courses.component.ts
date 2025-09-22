
import { Component, OnInit } from '@angular/core';
import { mockedCoursesList } from '@app/shared/mocks/mocks';

interface Course {
  id: string;
  title: string;
  description: string;
  creationDate: string | Date;
  duration: number;
  authors: string[];
}

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  editable = true;

  ngOnInit() {
    this.courses = [...mockedCoursesList];

    this.filteredCourses = [...this.courses];
  }

  onSearch(query: string) {
    this.filteredCourses = this.courses.filter(course =>
      course.title.toLowerCase().includes(query.toLowerCase())
    );
  }

  getAuthorNames(authors: string[]) {
    return authors.join(', ');
  }

  onShow(title: string) {
    console.log('Show course:', title);
  }

  onEdit(title: string) {
    console.log('Edit course:', title);
  }

  onDelete(title: string) {
    console.log('Delete course:', title);
  }
}