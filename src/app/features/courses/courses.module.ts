import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { CourseInfoModule } from "../course-info/course-info.module";
import { CourseListModule } from './course-list/course-list.module';
import { CoursesRoutingModule } from './courses-routing.module';

@NgModule({
  declarations: [CoursesComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CoursesRoutingModule,
    CourseInfoModule,
    CourseListModule,
]
})
export class CourseModule {}
